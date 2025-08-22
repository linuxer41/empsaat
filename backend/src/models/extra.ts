import { t } from "elysia";

export const FacturaSchema = t.Object(
    {
      factura: t.Number({
        description: "Número de factura",
        required: true,
      }),
      emision: t.Union([
        t.String({
          description: "Fecha de emisión de la factura en formato ISO",
          required: true,
        }),
        t.Date({
          description: "Fecha de emisión de la factura como objeto Date",
          required: true,
        }),
      ]),
      lectura: t.Number({
        description: "Lectura actual del medidor",
        required: true,
      }),
      conM3: t.Number({
        description: "Consumo en metros cúbicos",
        required: true,
      }),
      impFactura: t.Number({
        description: "Importe total de la factura",
        required: true,
      }),
      fecPago: t.Union([
        t.String({
          description: "Fecha de pago de la factura en formato ISO",
          required: false,
        }),
        t.Date({
          description: "Fecha de pago de la factura como objeto Date",
          required: false,
        }),
      ]),
      codigoControl: t.String({
        description: "Código de control de la factura",
        required: true,
      }),
      abonado: t.Number({
        description: "Identificador del abonado asociado a la factura",
        required: true,
      }),
    },
    {
      description: "Esquema principal para la entidad Factura",
    }
  );

export const HistorialFacturasSchema = t.Object(
    {
      emision: t.Union([
        t.String({
          description: "Fecha de emisión de la factura en formato ISO",
          required: true,
        }),
        t.Date({
          description: "Fecha de emisión de la factura como objeto Date",
          required: true,
        }),
      ]),
      conM3: t.Number({
        description: "Consumo en metros cúbicos",
        required: true,
      }),
      lectura: t.Number({
        description: "Lectura actual del medidor",
        required: true,
      }),
      impFactura: t.Number({
        description: "Importe total de la factura",
        required: true,
      }),
      fecPago: t.Union([
        t.String({
          description: "Fecha de pago de la factura en formato ISO",
          required: false,
        }),
        t.Date({
          description: "Fecha de pago de la factura como objeto Date",
          required: false,
        }),
      ]),
    },
    {
      description: "Esquema principal para la entidad HistorialFacturas",
    }
  );


  export const ServicioSolicitudSchema = t.Object(
    {
      costo: t.Number({
        description: "Costo del servicio solicitado",
        required: true,
      }),
      descripcion: t.String({
        description: "Descripción del servicio solicitado",
        required: true,
      }),
      cobrado: t.Boolean({
        description: "Indica si el servicio ha sido cobrado (true/false)",
        required: true,
      }),
      estado: t.String({
        description: "Estado del servicio ('1' para activo, otros valores para inactivo)",
        required: true,
      }),
      abonado: t.Number({
        description: "Identificador del abonado asociado al servicio",
        required: true,
      }),
    },
    {
      description: "Esquema principal para la entidad ServicioSolicitud",
    }
  );

  export const AbonadoSchema = t.Object(
    {
      abonado: t.Number({
        description: "Identificador único del abonado",
        required: true,
      }),
      nombre: t.String({
        description: "Nombre completo del usuario",
        required: true,
      }),
      categoria: t.String({
        description: "Categoría del usuario (residencial, comercial, etc.)",
        required: true,
      }),
      nit: t.Number({
        description: "Número de Identificación Tributaria (NIT) del usuario",
        required: true,
      }),
      direccion: t.String({
        description: "Dirección del usuario",
        required: true,
      }),
      zona: t.String({
        description: "Zona donde se encuentra el usuario",
        required: true,
      }),
      calle: t.String({
        description: "Calle donde se encuentra el usuario",
        required: true,
      }),
      num: t.String({
        description: "Número de la vivienda o local del usuario",
        required: false,
      }),
      ruta: t.String({
        description: "Ruta asignada al usuario",
        required: false,
      }),
      subRuta: t.String({
        description: "Subruta asignada al usuario",
        required: false,
      }),
      numRuta: t.String({
        description: "Número de ruta asignado al usuario",
        required: false,
      }),
    },
    {
      description: "Esquema principal para la entidad Usuario",
    }
  );

export type Factura = typeof FacturaSchema.static;
export type HistorialFacturas = typeof HistorialFacturasSchema.static;
export type ServicioSolicitud = typeof ServicioSolicitudSchema.static;
export type Abonado = typeof AbonadoSchema.static;