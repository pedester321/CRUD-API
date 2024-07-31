import Fastify from 'fastify';
import { checkApiKey } from './middlewares/apiKeyMiddleware.js';
import { configureCors } from './middlewares/corsConfig.js';
import { configureSwagger } from './middlewares/swaggerConfig.js';
import { configureSwaggerUi } from './middlewares/swaggerUiConfig.js';
import 'dotenv/config';
import fastifyMultipart from '@fastify/multipart';
import ejs from 'ejs';
import fastifyView from'@fastify/view';

//importando as routes
import productRoutes from './routes/productRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const server = Fastify({ logger: true });

server.register(fastifyView, {
  engine: {
    ejs: ejs,
  }
});

server.register(fastifyMultipart);

// Aplicando middlewares e configurações
server.decorate('checkApiKey', checkApiKey);
configureCors(server);
await configureSwagger(server);
configureSwaggerUi(server);

//registrando as routes importadas
server.register(productRoutes);
//server.register(imageRoutes, { prefix: '/images' });

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