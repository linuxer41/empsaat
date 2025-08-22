import { Elysia, t } from 'elysia';
import { debtService } from '../services/debt';

import { db } from '../db';
import { DeudaClienteSchema, DeudaServicioSchema } from '../models/debt';
import { authPlugin } from '../plugins';
import { facturacionCompraVenta } from '../utils/invoicing';
interface DetalleFactura {
  codigoProducto: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: number;
  precioUnitario: number;
  montoDescuento: number;
  subTotal: number;
}




export const debtController = new Elysia({ prefix: '/deudas', tags: ['deuda'], detail: { summary: 'Obtener las deudas del cliente', description: 'Retorna las deudas del cliente especificadas.', security: [{ apiKey: [], token: [] }] } })
.use(debtService)
// .use(authPlugin)

  .get('/:abonado', async ({ params }) => {
    const abonado = Number(params.abonado);
    if (isNaN(abonado)) {
      throw new Error('Abonado inválido');
    }

    const result = await db.debt.verDeudasActuales(abonado);

    return result;
  }, {
    detail: {
      summary: 'Obtener deudas actuales',
      description: 'Retorna las deudas actuales de un abonado, incluyendo consumo y servicios.',
    },
    params: t.Object({ abonado: t.Number() }),
    response: {
        200: DeudaClienteSchema,
        400: t.String(),
        500: t.String(),
    },
  })

  // ingresar un pago
  .post('/:abonado/factura-servicios', async ({ params: { abonado }, body }) => {
    try {
        const { usuario, nit, idServicios } = await body;
        if (!idServicios || idServicios.length === 0) {
          throw new Error("Debe seleccionar al menos un servicio para pagar.");
        }
        let {total, detalle: servicios} = await db.debt.obtenerDeudaServicios(abonado, idServicios);
        if (total <= 0) {
          throw new Error(`No puede facturar ${total} porque no hay total para facturar. services: ${JSON.stringify(servicios)}`);
        }
        let detalleFactura: DetalleFactura[] = [];
        for (let servicio of servicios) {
          if (servicio.costo > 0) {
            let existingIndex = detalleFactura.findIndex((x) => x.descripcion === servicio.descripcion);
            if (existingIndex === -1) {
              detalleFactura.push({
                codigoProducto: `${servicio.noSolicitud}`,
                descripcion: servicio.descripcion,
                cantidad: 1,
                unidadMedida: 62,
                precioUnitario: servicio.costo,
                montoDescuento: 0,
                subTotal: servicio.costo,
              });
            } else {
              detalleFactura[existingIndex].subTotal += servicio.costo;
              detalleFactura[existingIndex].cantidad += 1;
            }
          }
        }
    
        let facturaResponse = await facturacionCompraVenta.facturaCompraVenta(detalleFactura, total, usuario, String(abonado), nit);
        console.log('facturaResponse', facturaResponse);
        let cuf = facturaResponse.cuf;
        let numeroFactura = facturaResponse.number;

        await db.debt.pagarFacturaServicios(total, cuf, numeroFactura, nit, usuario, servicios, abonado);

        const anularFactura = await facturacionCompraVenta.anularFactura(cuf);
        console.log('anularFactura', anularFactura);
        
        return { message: "Pago exitoso", data: 
          {
            cuf,
            numeroFactura,
            servicios,
            total
          }
         };
        
      } catch (error) {
        console.error("Error al facturar servicios:", error);
        throw new Error("Error en la facturación");
      }
  }, {
    detail: {
      summary: 'Ingresar un pago',
      description: 'Ingresa un pago para un abonado.',
    },
    params: t.Object({ abonado: t.Number() }),
    body: t.Object({
      total: t.Number(),
      usuario: t.String(),
      nit: t.String(),
      idServicios: t.Array(t.Number())
    }),

    response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            cuf: t.String(),
            numeroFactura: t.String(),
            total: t.Number(),
            servicios: t.Array(DeudaServicioSchema)
          })
        }),
        400: t.String(),
        500: t.String(),
    },
  })

  // ingresar un pago
  .post('/:abonado/factura-agua', async ({ params: { abonado }, body }) => {
    const result = await db.debt.addPayment(abonado, body);
    return result;
  }, {
    detail: {
      summary: 'Ingresar un pago',
      description: 'Ingresa un pago para un abonado.',
    },
    params: t.Object({ abonado: t.Number() }),
    body: t.Array(
      t.Object({
        cuf: t.String({
          description: "CUF de la factura",
        }),
      })
    ),
    response: {
        200: DeudaClienteSchema,
        400: t.String(),
        500: t.String(),
    },
  })
  
  // obtener pagos
  // .get('/:abonado/pagos', async ({ params: { abonado } }) => {
  //   const result = await db.debt.getPayments(abonado);
  //   return result;
  // }, {
  //   detail: {
  //     summary: 'Obtener pagos',
  //     description: 'Retorna los pagos de un abonado.',
  //   },
  //   params: t.Object({ abonado: t.Number() }),
  //   response: {
  //       200: t.Array(DeudaPagoSchema),
  //       400: t.String(),
  //       500: t.String(),
  //   },
  //   })