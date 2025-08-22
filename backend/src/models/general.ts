import { t } from 'elysia';

export const ClienteSchema = t.Object(
  {
    cliente: t.String({
      description: "Identificador único del cliente",
      required: true,
    }),
    documento: t.String({
      description: "Documento de identificación del cliente",
      required: true,
    }),
    razon: t.String({
      description: "Razón social o nombre del cliente",
      required: true,
    }),
    nit: t.Number({
      description: "Número de Identificación Tributaria (NIT) del cliente",
      required: true,
    }),
    nacimiento: t.Union([
      t.String({
        description: "Fecha de nacimiento del cliente en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de nacimiento del cliente como objeto Date",
        required: true,
      }),
    ]),
    telefono: t.String({
      description: "Teléfono de contacto del cliente",
      required: false, // Asumiendo que el teléfono puede ser opcional
    }),
    empleado: t.String({
      description: "Nombre o identificador del empleado asociado al cliente",
      required: false, // Asumiendo que el empleado puede ser opcional
    }),
    correo: t.String({
      description: "Correo electrónico del cliente",
      required: false, // Asumiendo que el correo puede ser opcional
    }),
  },
  {
    description: "Esquema principal para la entidad Cliente",
  }
);


export const FacturaSchema = t.Object(
  {
    factura: t.Number({
      description: "Identificador único de la factura",
      required: true,
    }),
    abonado: t.Number({
      description: "Número de abonado asociado a la factura",
      required: true,
    }),
    num_factura: t.Number({
      description: "Número de factura (float)",
      required: true,
    }),
    num_orden: t.Number({
      description: "Número de orden (float)",
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
    categoria: t.String({
      description: "Categoría de la factura",
      required: true,
    }),
    lectura: t.Number({
      description: "Lectura asociada a la factura",
      required: true,
    }),
    con_m3: t.Number({
      description: "Consumo en metros cúbicos",
      required: true,
    }),
    lec_estimada: t.Boolean({
      description: "Indica si la lectura es estimada (bit)",
      required: true,
    }),
    imp_fijo: t.Number({
      description: "Importe fijo de la factura (money)",
      required: true,
    }),
    imp_adic: t.Number({
      description: "Importe adicional de la factura (money)",
      required: true,
    }),
    imp_total: t.Number({
      description: "Importe total de la factura (money)",
      required: true,
    }),
    imp_alcanta: t.Number({
      description: "Importe de alcantarillado (money)",
      required: true,
    }),
    imp_rep: t.Number({
      description: "Importe de reparación (money)",
      required: true,
    }),
    imp_car_1: t.Number({
      description: "Primer cargo adicional (money)",
      required: true,
    }),
    imp_car_2: t.Number({
      description: "Segundo cargo adicional (money)",
      required: true,
    }),
    imp_recargo: t.Number({
      description: "Importe de recargo (money)",
      required: true,
    }),
    imp_ley1886_1: t.Number({
      description: "Primer importe relacionado con la Ley 1886 (money)",
      required: true,
    }),
    imp_ley1886_2: t.Number({
      description: "Segundo importe relacionado con la Ley 1886 (money)",
      required: true,
    }),
    imp_factura: t.Number({
      description: "Importe total de la factura (money)",
      required: true,
    }),
    imp_iva: t.Number({
      description: "Importe del IVA (money)",
      required: true,
    }),
    imp_ite: t.Number({
      description: "Importe ITE (money)",
      required: true,
    }),
    nit: t.Number({
      description: "Número de Identificación Tributaria (NIT) (float)",
      required: true,
    }),
    codigo_control: t.String({
      description: "Código de control de la factura",
      required: true,
    }),
    alfa_no: t.String({
      description: "Identificador alfanumérico",
      required: true,
    }),
    fec_pago: t.Union([
      t.String({
        description: "Fecha de pago en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de pago como objeto Date",
        required: true,
      }),
    ]),
    valida: t.String({
      description: "Estado de validación de la factura",
      required: true,
    }),
    comprobante: t.Number({
      description: "Número de comprobante",
      required: true,
    }),
    servicio: t.Number({
      description: "Identificador del servicio",
      required: true,
    }),
    empleado: t.Number({
      description: "Identificador del empleado",
      required: true,
    }),
    cajero: t.String({
      description: "Nombre o identificador del cajero",
      required: true,
    }),
    punto: t.Number({
      description: "Punto de venta",
      required: true,
    }),
    imp_descuento: t.Number({
      description: "Importe de descuento (numeric)",
      required: true,
    }),
    imp_desalcan: t.Number({
      description: "Importe de descuento de alcantarillado (numeric)",
      required: true,
    }),
  },
  {
    description: "Esquema principal para la entidad Factura",
  }
);


export const AbonadoSchema = t.Object(
  {
    abonado: t.Number({
      description: "Identificador único del abonado",
      required: true,
    }),
    nombre: t.String({
      description: "Nombre del abonado",
      required: true,
    }),
    nit: t.Number({
      description: "Número de Identificación Tributaria (NIT) del abonado",
      required: true,
    }),
    medidor: t.String({
      description: "Número o identificador del medidor",
      required: true,
    }),
    zona: t.String({
      description: "Zona donde se encuentra el abonado",
      required: true,
    }),
    calle: t.String({
      description: "Nombre de la calle del abonado",
      required: true,
    }),
    num: t.String({
      description: "Número de la dirección del abonado",
      required: true,
    }),
    ruta: t.Number({
      description: "Ruta asociada al abonado",
      required: true,
    }),
    subruta: t.Number({
      description: "Subruta asociada al abonado",
      required: true,
    }),
    numruta: t.Number({
      description: "Número de ruta asociada al abonado",
      required: true,
    }),
    categoria: t.String({
      description: "Categoría del abonado",
      required: true,
    }),
    ley1886: t.Boolean({
      description: "Indica si aplica la Ley 1886 (bit)",
      required: true,
    }),
    no_afi: t.Number({
      description: "Número de afiliación",
      required: true,
    }),
    fec_afi: t.Union([
      t.String({
        description: "Fecha de afiliación en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de afiliación como objeto Date",
        required: true,
      }),
    ]),
    d_i: t.String({
      description: "Documento de identidad del abonado",
      required: true,
    }),
    fec_sol: t.Union([
      t.String({
        description: "Fecha de solicitud en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de solicitud como objeto Date",
        required: true,
      }),
    ]),
    fec_ins: t.Union([
      t.String({
        description: "Fecha de instalación en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de instalación como objeto Date",
        required: true,
      }),
    ]),
    fec_con: t.Union([
      t.String({
        description: "Fecha de conexión en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de conexión como objeto Date",
        required: true,
      }),
    ]),
    fec_cor: t.Union([
      t.String({
        description: "Fecha de corte en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de corte como objeto Date",
        required: true,
      }),
    ]),
    fec_rec: t.Union([
      t.String({
        description: "Fecha de reconexión en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de reconexión como objeto Date",
        required: true,
      }),
    ]),
    estado: t.String({
      description: "Estado actual del abonado",
      required: true,
    }),
    nota: t.String({
      description: "Notas adicionales sobre el abonado",
      required: false, // Asumiendo que puede ser opcional
    }),
    lect_inicial: t.Number({
      description: "Lectura inicial del medidor",
      required: true,
    }),
    doc: t.String({
      description: "Documento relacionado con el abonado",
      required: true,
    }),
    nodoc: t.String({
      description: "Número de documento relacionado",
      required: true,
    }),
    nacimiento: t.Union([
      t.String({
        description: "Fecha de nacimiento en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de nacimiento como objeto Date",
        required: true,
      }),
    ]),
    liberacion: t.String({
      description: "Estado de liberación del abonado",
      required: true,
    }),
    consfijo: t.Number({
      description: "Consumo fijo asociado al abonado",
      required: true,
    }),
    cajero: t.String({
      description: "Nombre o identificador del cajero",
      required: true,
    }),
  },
  {
    description: "Esquema principal para la entidad Abonado",
  }
);

export const SolicitudServicioSchema = t.Object(
  {
    nosolicitud: t.Number({
      description: "Número de solicitud",
      required: true,
    }),
    abonado: t.Number({
      description: "Identificador del abonado asociado a la solicitud",
      required: true,
    }),
    fecha: t.Union([
      t.String({
        description: "Fecha de la solicitud en formato ISO",
        required: true,
      }),
      t.Date({
        description: "Fecha de la solicitud como objeto Date",
        required: true,
      }),
    ]),
    servicio: t.Number({
      description: "Identificador del servicio relacionado",
      required: true,
    }),
    costo: t.Number({
      description: "Costo asociado a la solicitud",
      required: true,
    }),
    nota: t.String({
      description: "Nota adicional sobre la solicitud",
      required: false, // Asumiendo que puede ser opcional
    }),
    cobrado: t.Boolean({
      description: "Indica si el servicio ha sido cobrado (bit)",
      required: true,
    }),
    factura: t.Number({
      description: "Número de factura relacionada",
      required: true,
    }),
    estado: t.String({
      description: "Estado de la solicitud (1 carácter)",
      required: true,
    }),
    fec_atendido: t.Union([
      t.String({
        description: "Fecha de atención en formato ISO",
        required: false,
      }),
      t.Date({
        description: "Fecha de atención como objeto Date",
        required: false,
      }),
    ]),
    fec_sistema: t.Union([
      t.String({
        description: "Fecha del sistema en formato ISO",
        required: false,
      }),
      t.Date({
        description: "Fecha del sistema como objeto Date",
        required: false,
      }),
    ]),
    empleado: t.Number({
      description: "Identificador del empleado asociado",
      required: false,
    }),
    elaborado: t.Number({
      description: "Identificador del usuario que elaboró la solicitud",
      required: false,
    }),
    nolista: t.Number({
      description: "Número de lista asociado",
      required: false,
    }),
    pagado: t.String({
      description: "Estado de pago (1 carácter)",
      required: false,
    }),
    nombre: t.String({
      description: "Nombre del solicitante",
      required: false,
    }),
    doc: t.String({
      description: "Tipo de documento",
      required: false,
    }),
    nodoc: t.String({
      description: "Número de documento",
      required: false,
    }),
    nit: t.String({
      description: "Número de Identificación Tributaria (NIT)",
      required: false,
    }),
    nacimiento: t.Union([
      t.String({
        description: "Fecha de nacimiento en formato ISO",
        required: false,
      }),
      t.Date({
        description: "Fecha de nacimiento como objeto Date",
        required: false,
      }),
    ]),
    ruta: t.Number({
      description: "Ruta asociada al abonado",
      required: false,
    }),
    subruta: t.Number({
      description: "Subruta asociada al abonado",
      required: false,
    }),
    zona: t.String({
      description: "Zona donde se encuentra el abonado",
      required: false,
    }),
    calle: t.String({
      description: "Calle del abonado",
      required: false,
    }),
    numero: t.String({
      description: "Número de la dirección del abonado",
      required: false,
    }),
    categoria: t.String({
      description: "Categoría del abonado",
      required: false,
    }),
    desc_categoria: t.String({
      description: "Descripción de la categoría",
      required: false,
    }),
    noruta: t.Number({
      description: "Número de ruta asociada",
      required: false,
    }),
    formulario: t.Boolean({
      description: "Indica si se ha generado un formulario (bit)",
      required: true,
    }),
    cajero: t.String({
      description: "Nombre o identificador del cajero",
      required: false,
    }),
  },
  {
    description: "Esquema principal para la entidad Solicitud",
  }
);

export type Cliente = typeof ClienteSchema.static;

export type Factura = typeof FacturaSchema.static;

export type Abonado = typeof AbonadoSchema.static;

export type SolicitudServicio = typeof SolicitudServicioSchema.static;