import swaggerUi from '@fastify/swagger-ui';

export const configureSwaggerUi = (server) => {
  server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    exposeRoute: true,
  });
};