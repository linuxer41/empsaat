import { DeudaAgua, DeudaCliente, DeudaServicio } from '../../models/debt';
import { BaseDB } from './base-db';

export class DeudaDB extends BaseDB {
  addPayment(abonado: number, body: { cuf: string; }[]) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }

  async obtenerDeudaAgua(abonado: number): Promise<{ total: number; detalle: DeudaAgua[] }> {
    const query = `
      SELECT 
        SUM(imp_factura) AS total 
      FROM 
        facturas 
      WHERE 
        abonado = @abonado AND fec_pago IS NULL
    `;
    const result = await this.executeQuery<{ total: number }>(query, { abonado });
    const total = parseFloat(result?.[0]?.total?.toString() || '0');

    const query2 = `
      SELECT 
        factura, emision, lectura, con_m3 as consumoM3, imp_factura as importeFactura, fec_pago as fechaPago, codigo_control as cufFactura, abonado
      FROM 
        facturas 
      WHERE 
        abonado = @abonado AND fec_pago IS NULL AND imp_factura > 0 AND codigo_control <> '' AND servicio = '1' 
      ORDER BY 
        emision ASC
    `;
    const result2 = await this.executeQuery<DeudaAgua>(query2, { abonado });

    return {
      total,
      detalle: result2
    };
  }

  async obtenerDeudaServicios(abonado: number, idServicios?: number[]): Promise<{ total: number; detalle: DeudaServicio[] }> {
    const query = `
      SELECT 
        SUM(costo) AS total 
      FROM 
        servicios_solicitud 
      WHERE 
        cobrado = 0 AND estado = '1' AND costo > 0 AND abonado = @abonado
        AND (@idServicios IS NULL OR servicio IN (@idServicios))
    `;
    const result = await this.executeQuery<{ total: number }>(query, { abonado, idServicios: idServicios || null });
    const total = parseFloat(result?.[0]?.total?.toString() || '0');

    const query2 = `
      SELECT 
        L.NoSolicitud as noSolicitud, L.fecha, S.descripcion, L.costo 
      FROM 
        servicios_solicitud L 
      INNER JOIN 
        servicios_lista S ON L.servicio = S.servicio 
      WHERE 
        L.cobrado = 0 AND L.estado = '1' AND L.costo > 0 AND L.abonado = @abonado 
        AND (@idServicios IS NULL OR S.servicio IN (@idServicios))
      ORDER BY 
        L.NoSolicitud
    `;
    const result2 = await this.executeQuery<DeudaServicio>(query2, { abonado, idServicios: idServicios || null });

    return {
      total,
      detalle: result2
    };
  }

  /**
   * Obtiene las deudas actuales de un abonado específico.
   * @param abonado - El ID del abonado.
   */
  async verDeudasActuales(abonado: number): Promise<DeudaCliente> {
    const { total: totalAgua, detalle: deudasConsumo } = await this.obtenerDeudaAgua(abonado);
    const { total: totalServicios, detalle: serviciosPendientes } = await this.obtenerDeudaServicios(abonado);
    const totalDeuda = totalAgua + totalServicios;

    return {
      deudasAgua: deudasConsumo,
      deudasServicios: serviciosPendientes,
      totales: {
        totalAgua,
        totalServicios,
        totalDeuda,
      },
    };
  }


  async pagarFacturaServicios(
    total: number,
    cuf: string,
    numeroFactura: string,
    nit: string,
    usuario: string,
    servicios: DeudaServicio[],
    abonado: number,
  ) {

      let nImporte = total;
      let nIce_Iehd_tasas = 0;
      let nExcentos = 0;
      let nVentas_Tasa_Cero = 0;
      let nSubtotal = nImporte - nIce_Iehd_tasas - nExcentos - nVentas_Tasa_Cero;
      let nDescuento = 0;
      let nImporte_Para_Debito = nSubtotal - nDescuento;
      let nDebito = Math.round(nImporte * 0.13 * 100) / 100;
      let nIte = Math.round(nImporte * 0.03 * 100) / 100;

      let queryFactura = `
        INSERT INTO LIBRO (ESPECIFICACION, FECHA, FACTURA, AUTORIZACION, ESTADO, NIT, RAZON, IMPORTE_VENTA, ICE_IEHD_TASAS, EXCENTAS, VENTAS_TASA_CERO, SUBTOTAL, DESCUENTOS, IMPORTE_PARA_DEBITO, DEBITO_FISCAL, CODIGO_CONTROL, SERVICIO, USUARIO, COMPROBANTE)
        VALUES ('3', GETDATE(), @factura, '0', 'V', @nit, @usuario, @importe, @ice_iehd_tasas, @excentos, @ventas_tasa_cero, @subtotal, @descuento, @importe_para_debito, @debito, @cuf, '2', @usuario, '0')
      `;
      await this.executeQuery(queryFactura, {
        factura: numeroFactura,
        nit,
        usuario,
        importe: nImporte,
        ice_iehd_tasas: nIce_Iehd_tasas,
        excentos: nExcentos,
        ventas_tasa_cero: nVentas_Tasa_Cero,
        subtotal: nSubtotal,
        descuento: nDescuento,
        importe_para_debito: nImporte_Para_Debito,
        debito: nDebito,
        cuf,
      });
  
      for (let servicio of servicios) {
        if (servicio.costo > 0) {
          let queryDetalle = `
            INSERT INTO LIBRO_DETALLE (FACTURA, AUTORIZACION, MATERIAL, DESCRIPCION, UNIDAD, UNITARIO, TOTAL, ENTREGA)
            VALUES (@factura, '0', @material, @descripcion, 'SER', @unitario, @total, '0')
          `;
          await this.executeQuery(queryDetalle, {
            factura: numeroFactura,
            material: servicio.noSolicitud,
            descripcion: servicio.descripcion,
            unitario: servicio.costo,
            total: servicio.costo,
          });
        }
      }
  
      let queryUpdateServicios = `
        UPDATE SERVICIOS_SOLICITUD
        SET COBRADO = 1, FACTURA = @factura
        WHERE COBRADO = 0 AND ESTADO = '1' AND COSTO > 0 AND ABONADO = @abonado
      `;
      await this.executeQuery(queryUpdateServicios, { factura: numeroFactura, abonado: abonado });
  }

  // async pagarFacturaConsumo(facturaId: number, abonadoId: number, usuario: string): Promise<void> {
  //   try {
  //       const factura = await obtenerFacturaPorId(facturaId);
  //       if (!factura || !factura.cuf || factura.numero === 0) {
  //           throw new Error("No hay CUF o número de factura inválido");
  //       }

  //       const emision = new Date(factura.emision);
  //       const importe = factura.importe;
  //       const debito = Math.round(importe * 0.13 * 100) / 100;

  //       if (emision < new Date("2008-01-01")) {
  //           const dosificacion = await obtenerDosificacionActiva();
  //           if (!dosificacion) {
  //               throw new Error("No hay dosificación activa");
  //           }
            
  //           const nuevaFactura = generarNuevoNumeroFactura(dosificacion.autorizacion);
  //           const codigoControl = generarCodigoControl(nuevaFactura, dosificacion.llave, importe);

  //           await registrarNuevaFactura({
  //               especificacion: 3,
  //               fecha: new Date(),
  //               numero: nuevaFactura,
  //               autorizacion: dosificacion.autorizacion,
  //               estado: 'V',
  //               nit: factura.nit,
  //               razon: factura.razon,
  //               importeVenta: importe,
  //               debitoFiscal: debito,
  //               codigoControl,
  //               servicio: 1,
  //               usuario,
  //               comprobante: generarComprobante()
  //           });

  //           await actualizarFactura(facturaId, nuevaFactura, dosificacion.autorizacion, codigoControl, usuario);
  //       } else {
  //           const resultado = await cancelarFacturaEnBD(facturaId, usuario);
  //           if (resultado === 1) {
  //               await imprimirFactura(factura.cuf, abonadoId);
  //           } else if (resultado === 0) {
  //               throw new Error("No se puede saltear pagos de las facturas");
  //           } else if (resultado === 2) {
  //               throw new Error("La factura ya está cancelada");
  //           }
  //       }

  //       console.log("Factura cancelada correctamente");
  //   } catch (error) {
  //       console.error("Error al cancelar la factura:", error.message);
  //   }
  // }

  
}

export const debtDB = new DeudaDB();