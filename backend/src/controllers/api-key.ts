
import Elysia from "elysia";
import { t } from 'elysia';
import { db } from "../db";
import { authPlugin } from "../plugins/auth";
import { apiKeyService } from "../services/api-key";
import { ApiKeySchema, ApiKey, ApiKeyCreateSchema, ApiKeyUpdateSchema } from "../models/api-key";
import { randomBytes } from "crypto";

function generateSegment(length = 6) {
  return randomBytes(length).toString("base64url").slice(0, length); // base64url evita caracteres especiales
}

// Función para generar una API Key al estilo GitHub/Docker
function generateApiKey() {
  const prefix = "empsaat";
  return `${prefix}_${generateSegment()}-${generateSegment()}_${generateSegment()}-${generateSegment()}`;
}

export const apiKeyController = new Elysia({ prefix: '/apiKey', tags: ['apiKey'], detail: { summary: 'Obtener todos los apiKeys', description: 'Retorna una lista de todos los apiKeys registrados.', security: [{ token: [] }] } })
  // .use(authPlugin)
  // .use(apiKeyService)
  .get('/', async ({ query }) => {
      const res = await db.apiKey.findMany({});
      return res as ApiKey[];
  }, {
      detail: {
          summary: 'Obtener todos los apiKeys',
          description: 'Retorna una lista de todos los apiKeys registrados.',
      },
      response: {
          200: t.Array(ApiKeySchema),
          400: t.String(),
          500: t.String(),
      },

  })
  .post('/', async ({ body }) => {
      const newApiKey: Partial<ApiKey> = {
        owner: body.owner!.toLowerCase(),
        isActive: true,
        apiKey: generateApiKey(),
      }
      const res = await db.apiKey.create(newApiKey as any);
      return res as ApiKey;
  }, {
      body: ApiKeyCreateSchema,
      detail: {
          summary: 'Crear un nuevo apiKey',
          description: 'Crea un nuevo registro de apiKey con los datos proporcionados.',
      },
      response: {
          200: ApiKeySchema,
          400: t.String(),
          500: t.String(),
      },
  })
  .get('/:apiKey', async ({ params }) => {
      const res = await db.apiKey.findUnique({
        apiKey: params.apiKey
      });
      return res as ApiKey;
  }, {
      detail: {
          summary: 'Obtener un apiKey por ID',
          description: 'Retorna un apiKey específico basado en su ID.',
      },
      response: {
          200: ApiKeySchema,
          400: t.String(),
          500: t.String(),
      },
  })
  .patch('/:apiKey', async ({ params, body }) => {
      const res = await db.apiKey.update(
            {
              apiKey: params.apiKey
            }, body
        );
      return res as ApiKey;
  }, {
      body: ApiKeyUpdateSchema,
      detail: {
          summary: 'Actualizar un apiKey',
          description: 'Actualiza un registro de apiKey existente con los datos proporcionados.',
      },
      response: {
          200: ApiKeySchema,
          400: t.String(),
          500: t.String(),
      },
  })
  .delete('/:apiKey', async ({ params }) => {
      const res = await db.apiKey.delete({ apiKey: params.apiKey});
      return res as ApiKey;
  }, {
      detail: {
          summary: 'Eliminar un apiKey',
          description: 'Elimina un registro de apiKey basado en su ID.',
      },
      response: {
          200: ApiKeySchema,
          400: t.String(),
          500: t.String(),
      },
  });
