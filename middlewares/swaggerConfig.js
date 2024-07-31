import swagger from '@fastify/swagger';

export const configureSwagger = async (server) => {
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
};