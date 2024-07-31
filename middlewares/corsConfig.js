import cors from '@fastify/cors';

export const configureCors = (server) => {
  server.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
};