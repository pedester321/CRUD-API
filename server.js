import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import 'dotenv/config';
import multer from 'fastify-multer'

//importando as routes
import productRoutes from './routes/products.js';
import imageRoutes from './routes/images.js';

const SUPER_SECRET = process.env.SUPER_SECRET
const server = Fastify({ logger: true });

// Middleware para verificação da chave de API
server.decorate('checkApiKey', async (request, reply) => {
  const apiKey = request.headers['api-key'];
  if (!apiKey || apiKey !== SUPER_SECRET) {
    reply.status(401).send({ error: 'Chave de API inválida' });
  }
});

// Configuração do CORS
server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});


// Configuração do Swagger
await server.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'API GroupStore',
      description: 'API do projeto GroupStore',
      version: '1.0.0',
    },
    host: 'crud-api-4l21.onrender.com',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'api-key',
        in: 'header',
      },
    },
  },
  exposeRoute: true,
});

server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  exposeRoute: true
});

//registrando as routes importadas
server.register(productRoutes);
server.register(imageRoutes);

//GET
server.get('/', {
  schema: {
    description: 'Retorna uma mensagem de boas-vindas',
    tags: ['General'],
    response: {
      200: {
        type: 'string',
        example: 'API GroupStore'
      }
    }
  }
}, (request, reply) => {
  return reply.send('API GroupStore');
});

//SERVER
server.listen(
  {
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
  },
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
await server.ready()
server.swagger()