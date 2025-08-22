import { Elysia, t } from 'elysia';
import { subscriberService } from '../services/subscriber';

import { db } from '../db';
import { ClienteSchema, AbonadoSchema } from '../models/subscriber';
import { authPlugin } from '../plugins';


export const subscriberController = new Elysia({ prefix: '/abonados', tags: ['abonado'], detail: { summary: 'Obtener los abonados', description: 'Retorna lista de abonados', security: [{ apiKey: [], token: [] }] } })
.use(subscriberService)
// .use(authPlugin)


  // list subscribers
  .get('/', async ({query: { limit, offset, search, abonado } }) => {
    const result = await db.subscriber.list(offset || 0, limit || 10, search, abonado);
    return result;
  }, {
    detail: {
      summary: 'Obtener abonados',
      description: 'Retorna lista de abonados',
    },
    query: t.Object({
      limit: t.Number({
        default: 10,
        minimum: 1,
        maximum: 100,
        description: 'Limitar resultados',
      }),
      offset: t.Optional(t.Number(
        {
          minimum: 0,
          description: 'Usar cursor para obtener la siguiente página de resultados',
        },
      )),
      abonado: t.Optional(t.Number({
        description: 'Filtrar resultados por abonado',
        // default: null,
      })),
      search: t.Optional(t.String({
        description: 'Filtrar resultados por nombre',
        // default: '',
      })),
    }),
    response: {
      // 200: t.Object(
      //   {
      //     data: t.Array(AbonadoSchema),
      //     count: t.Number({}),
      //     next_cursor: t.Number(),
      //   },
      // ),
      200: t.Object({
        data: t.Array(AbonadoSchema),
        count: t.Number({}),
      }),
      400: t.String(),
      500: t.String(),
    },
  })

// get subscriber by id
.get('/:abonado', async ({ params: { abonado } }) => {
  const result = await db.subscriber.get(abonado);
  if (!result) {
    throw new Error('Abonado no encontrado');
  }
  return result;
}, {
  detail: {
    summary: 'Obtener abonado',
    description: 'Retorna abonado por id',
  },
  params: t.Object({ abonado: t.Number() }),
  response: {
    200: AbonadoSchema,
    400: t.String(),
    500: t.String(),
  },
})

// update subscriber
// .put('/:abonado', async ({ params: { abonado }, body }) => {
//   const result = await db.subscriber.update({
//     where: { id: abonado },
//     data: body,
//   });
//   return result;
// }, {
//   detail: {
//     summary: 'Actualizar abonado',
//     description: 'Actualizar abonado',
//   },
//   params: t.Object({ abonado: t.Number() }),
//   body: ClienteSchema,
//   response: {
//     200: AbonadoSchema,
//     400: t.String(),
//     500: t.String(),
//   },
// });