
import Elysia, { error } from "elysia";
import { t } from 'elysia';
import { db } from "../db";
import { authPlugin } from "../plugins/auth";
import { userService } from "../services/user";
import { UserSchema, User, UserUpdateSchema, UserCreateSchema } from "../models/user";

export const userController = new Elysia({ prefix: '/user', tags: ['user'], detail: { summary: 'Obtener todos los users', description: 'Retorna una lista de todos los users registrados.', security: [{ token: [] }] } })
  .use(authPlugin)
  .use(userService)
  .get('/', async ({ query }) => {
      const res = await db.user.findMany({});
      return res as User[];
  }, {
      detail: {
          summary: 'Obtener todos los users',
          description: 'Retorna una lista de todos los users registrados.',
      },
      response: {
          200: t.Array(UserSchema),
          400: t.String(),
          500: t.String(),
      },

  })
  .post('/', async ({ body }) => {
      const unique = await db.user.findUnique({ email: body.email });
      if (unique) {
        // throw new Error('El usuario ya existe');
        return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 400 });
        // throw error(400, new Response(JSON.stringify({ error: 'El usuario ya existe' })));
      }
      const res = await db.user.create(body);
      return res as User;
  }, {
      body: UserCreateSchema,
      detail: {
          summary: 'Crear un nuevo user',
          description: 'Crea un nuevo registro de user con los datos proporcionados.',
      },
      response: {
          200: UserSchema,
        //   400: t.String(),
        //   500: t.String(),
      } as any,
  })
  .get('/:id', async ({ params }) => {
      const res = await db.user.findUnique({
        id: params.id
      });
      return res as User;
  }, {
      detail: {
          summary: 'Obtener un user por ID',
          description: 'Retorna un user específico basado en su ID.',
      },
      response: {
          200: UserSchema,
          400: t.String(),
          500: t.String(),
      },
  })
  .patch('/:id', async ({ params, body }) => {
      const res = await db.user.update(
            {
            id: params.id
            }, body
        );
      return res as User;
  }, {
      body: UserUpdateSchema,
      detail: {
          summary: 'Actualizar un user',
          description: 'Actualiza un registro de user existente con los datos proporcionados.',
      },
      response: {
          200: UserSchema,
          400: t.String(),
          500: t.String(),
      },
  })
  .delete('/:id', async ({ params }) => {
      const res = await db.user.delete({ id: params.id});
      return res as User;
  }, {
      detail: {
          summary: 'Eliminar un user',
          description: 'Elimina un registro de user basado en su ID.',
      },
      response: {
          200: UserSchema,
          400: t.String(),
          500: t.String(),
      },
  });
