
import { Elysia, t } from 'elysia';
import { ClienteSchema, FacturaSchema, AbonadoSchema, SolicitudServicioSchema } from '../models/general';

export const generalService = new Elysia({ name: 'general/service' })
  .model({
      Cliente: ClienteSchema,
      Factura: FacturaSchema,
      Abonado: AbonadoSchema,
      SolicitudServicio: SolicitudServicioSchema,
  });
