export const checkApiKey = async (request, reply) => {
    const apiKey = request.headers['api-key'];
    if (!apiKey || apiKey !== process.env.SUPER_SECRET) {
      reply.status(401).send({ error: 'Chave de API inválida' });
    }
  };