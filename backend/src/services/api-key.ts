
import { Elysia, t } from 'elysia';
import { ApiKeySchema, ApiKeyCreateSchema, ApiKeyUpdateSchema } from '../models/api-key';

export const apiKeyService = new Elysia({ name: 'debt/service' })
  .model({
    ApiKeySchema,
    ApiKeyCreateSchema,
    ApiKeyUpdateSchema
  });


