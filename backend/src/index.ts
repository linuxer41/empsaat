
import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { userController } from './controllers/user';
import { debtController } from './controllers/debt';
import { subscriberController } from './controllers/subscriber';
import { apiKeyController } from './controllers/api-key';
import { authController } from './controllers/auth';

// Configuración común para CORS
const commonCorsConfig = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Code'],
  credentials: true,
  maxAge: 86400,
};

// Middleware para autenticación básica en /docs
const basicAuthMiddleware = ({ request }: { request: Request }) => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
  }

  const credentials = atob(authHeader.split(' ')[1]).split(':');
  const [username, password] = credentials;

  if (username !== 'admin' || password !== 'securepass') {
    return new Response('Forbidden', { status: 403 });
  }
};

// Servicio Principal (puerto 3001)
const mainApp = new Elysia()
  .use(opentelemetry())
  .use(cors(commonCorsConfig))
  .get('/docs', basicAuthMiddleware)
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'API EMPSAAT',
        version: '1.0.0',
        description: 'API principal del sistema de EMPSAAT, permitiendo interactuar y gestionar datos relacionados a nivel de administrador y usuario internos de la empresa.',
      },
      tags: [
        { name: 'user', description: 'Operaciones relacionadas con usuarios' },
        { name: 'apiKey', description: 'Operaciones relacionadas con claves API' },
        // { name: 'deuda', description: 'Operaciones relacionadas con deudas' },
        // { name: 'abonado', description: 'Operaciones relacionadas con abonados' },
      ],
      components: {
        securitySchemes: {
          token: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          apiKey: {
            type: 'apiKey',
            name: 'api-key',
            in: 'header',
          },
        },
      },
    },
    scalarConfig: {
      layout: 'classic',
      hideModels: true,
    },
    // provider: 'swagger-ui',
  }))
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :(';
    console.error(error);
  })
  .get('/', ({ path }) => ({
    message: `Hola desde ${path}`,
  }), {
    tags: ['inicio'],
    detail: {
      summary: 'Retorna el mensaje con el path de la ruta para pruebas',
      description: 'Retorna el mensaje con el path de la ruta para pruebas',
    },
  })
  .use(authController)
  .use(userController)
  // .use(debtController)
  .use(apiKeyController)
  // .use(subscriberController)
  .listen(3001);

console.log(`🦊 Servicio Principal está corriendo en http://${mainApp.server?.hostname}:${mainApp.server?.port}`);

//api de integracion (puerto 3002)
const thirdPartyApp = new Elysia()
  .use(opentelemetry())
  .use(cors(commonCorsConfig))
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'API de Integración EMPSAAT',
        version: '1.0.0',
        description: 'API de integración para terceros con el sistema de EMPSAAT, enfocada en operaciones específicas como gestión de deudas, abonados.',
      },
      tags: [
        { name: 'deuda', description: 'Operaciones relacionadas con deudas' },
        { name: 'abonado', description: 'Operaciones relacionadas con abonados' },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'api-key',
            in: 'header',
          },
        },
      },
    },
    scalarConfig: {
      layout: 'classic',
      hideModels: true,
    },
    // provider: 'swagger-ui',
  }))
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :(';
    console.error(error);
  })
  .get('/', ({ path }) => ({
    message: `Hola desde ${path} - api de integracion`,
  }), {
    tags: ['inicio'],
    detail: {
      summary: 'Retorna el mensaje con el path de la ruta para pruebas',
      description: 'Retorna el mensaje con el path de la ruta para pruebas',
    },
  })
  .use(debtController)
  .use(subscriberController)
  .listen(3002);

console.log(`🦊 Api de integracion está corriendo en http://${thirdPartyApp.server?.hostname}:${thirdPartyApp.server?.port}`);