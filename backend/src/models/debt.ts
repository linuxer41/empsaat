import { t } from 'elysia';

/**
 * Esquema para representar una deuda relacionada con el consumo de agua.
 * Contiene detalles sobre la factura, lecturas, consumo y pagos.
 */
export const DeudaAguaSchema = t.Object({
  factura: t.Number({ description: "Número de factura asociada al consumo de agua." }),
  emision: t.Date({ description: "Fecha de emisión de la factura (formato ISO)." }),
  lectura: t.Number({ description: "Lectura del medidor de agua en metros cúbicos." }),
  consumoM3: t.Number({ description: "Consumo de agua en metros cúbicos." }),
  importeFactura: t.Number({ description: "Importe total de la factura." }),
  fechaPago: t.Optional(t.Union([t.Date(), t.Null()], { description: "Fecha de pago de la factura (opcional)." })),
  cufFactura: t.String({ description: "Código único de la factura (CUF)." }),
  abonado: t.Number({ description: "Identificador único del abonado." }),
});

/**
 * Tipo TypeScript derivado del esquema DeudaAguaSchema.
 */
export type DeudaAgua = typeof DeudaAguaSchema.static;

/**
 * Esquema para representar una deuda relacionada con servicios adicionales.
 * Contiene detalles sobre la solicitud, descripción y costo del servicio.
 */
export const DeudaServicioSchema = t.Object({
  noSolicitud: t.Number({ description: "Número de solicitud del servicio." }),
  fecha: t.Optional(t.Date({ description: "Fecha de solicitud del servicio (opcional)." })),
  descripcion: t.String({ description: "Descripción del servicio solicitado." }),
  costo: t.Number({ description: "Costo total del servicio." }),
});

/**
 * Tipo TypeScript derivado del esquema DeudaServicioSchema.
 */
export type DeudaServicio = typeof DeudaServicioSchema.static;

/**
 * Esquema para representar los totales de las deudas del cliente.
 * Incluye el total de deudas por agua, servicios y el total general.
 */
export const TotalDeudaSchema = t.Object({
  totalAgua: t.Number({ description: "Total de deudas relacionadas con el consumo de agua." }),
  totalServicios: t.Number({ description: "Total de deudas relacionadas con servicios adicionales." }),
  totalDeuda: t.Number({ description: "Total general de todas las deudas del cliente." }),
});

/**
 * Tipo TypeScript derivado del esquema TotalDeudaSchema.
 */
export type TotalDeuda = typeof TotalDeudaSchema.static;

/**
 * Esquema principal que agrupa todas las deudas de un cliente.
 * Incluye deudas por agua, servicios y los totales consolidados.
 */
export const DeudaClienteSchema = t.Object({
  deudasAgua: t.Array(DeudaAguaSchema, { description: "Lista de deudas relacionadas con el consumo de agua." }),
  deudasServicios: t.Array(DeudaServicioSchema, { description: "Lista de deudas relacionadas con servicios adicionales." }),
  totales: TotalDeudaSchema,
});

/**
 * Tipo TypeScript derivado del esquema DeudaClienteSchema.
 */
export type DeudaCliente = typeof DeudaClienteSchema.static;