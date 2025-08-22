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
    categoria: t.String({
      description: "Categoría del abonado",
      required: true,
    }),
    ley1886: t.Boolean({
      description: "Indica si aplica la Ley 1886 (bit)",
      required: true,
    }),
    estado: t.String({
      description: "Estado actual del abonado",
      required: true,
    }),
  },
  {
    description: "Esquema principal para la entidad Abonado",
  }
);

export type Cliente = typeof ClienteSchema.static;


export type Abonado = typeof AbonadoSchema.static;
