import { t } from 'elysia';

// Modelo Principal
export const ApiKeySchema = t.Object(
  {
    id: t.String({
      description: "Identificador único de la API Key",
      required: true
    }),
    apiKey: t.String({
      description: "Clave de la API en formato seguro",
      required: true
    }),
    owner: t.String({
      description: "Nombre del usuario que tiene la API Key",
      required: true
    }),
    isActive: t.Boolean({
      description: "Indica si la API Key está activa",
      required: true,
      default: true
    }),
    createdAt: t.Union([
      t.String({
        description: 'Fecha de creación de la API Key',
        required: true
      }),
      t.Date({
        description: 'Fecha de creación de la API Key',
        required: true
      })
    ]),
    updatedAt: t.Union([
        t.String({
          description: 'Fecha de Actualización de la API Key',
          required: true
        }),
        t.Date({
          description: 'Fecha de Actualización de la API Key',
          required: true
        })
      ]),
    expiresAt: t.Optional(t.Union([
      t.String({
        description: 'Fecha de expiración de la API Key',
        required: false
      }),
      t.Date({
        description: 'Fecha de expiración de la API Key',
        required: false
      })
    ]))
  },
  {
    description: 'Esquema principal para la entidad API Key'
  }
);

export type ApiKey = typeof ApiKeySchema.static;

// Modelo de Creación
export const ApiKeyCreateSchema = t.Object(
  {
    owner: t.String({
      description: "Nombre del usuario que tiene la API Key",
      required: true
    }),
  },
  {
    description: 'Esquema para la creación de una API Key'
  }
);

export type ApiKeyCreate = typeof ApiKeyCreateSchema.static;

// Modelo de Actualización (ej. desactivar o actualizar expiración)
export const ApiKeyUpdateSchema = t.Object(
  {
    isActive: t.Optional(t.Boolean({
      description: "Estado de la API Key",
      required: true
    })),
    // expiresAt: t.Optional(t.Union([
    //   t.String({
    //     description: 'Nueva fecha de expiración',
    //     required: false
    //   }),
    //   t.Date({
    //     description: 'Nueva fecha de expiración',
    //     required: false
    //   })
    // ]))
  },
  {
    description: 'Esquema para la actualización de una API Key'
  }
);

export type ApiKeyUpdate = typeof ApiKeyUpdateSchema.static;
