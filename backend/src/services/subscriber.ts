
import { Elysia, t } from 'elysia';
import { AbonadoSchema, ClienteSchema } from '../models/subscriber';

export const subscriberService = new Elysia({ name: 'subscriber/service' })
  .model({
    AbonadoSchema, ClienteSchema
  });


