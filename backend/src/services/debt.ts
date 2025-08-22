
import { Elysia, t } from 'elysia';
import { DeudaAguaSchema, DeudaServicioSchema, TotalDeudaSchema } from '../models/debt';

export const debtService = new Elysia({ name: 'debt/service' })
  .model({
    DeudaAguaSchema, DeudaServicioSchema, TotalDeudaSchema
  });
