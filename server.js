import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const server = Fastify();

import { DatabasePostgres } from './database-postgres.js'

const database = new DatabasePostgres()

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
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
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

server.get('/products' ,{
    schema: {
      description: 'Retorna uma lista de produtos',
      tags: ['Products'],
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string', description: 'Termo de busca para produtos' }
        },
        required: []
      },
      response: {
        200: {
          description: 'Lista de produtos',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid', description: 'UUID do produto' },
              name: { type: 'string' },
              price: { type: 'number', description: 'Preço do produto' },
              description: { type: 'string' }
            }
          }
        }
      }
    }
  },async (request) => {
    const search = request.query.search

    const products = database.getProducts(search)

    return products
});

//POST
server.post('/products', {
    schema: {
      description: 'Cria um novo produto',
      tags: ['Products'],
      body: {
        type: 'object',
        required: ['name', 'price', 'description'],
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          description: { type: 'string' }
        }
      },
      response: {
        201: {
            description: 'Produto criado com sucesso',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              price: { type: 'number' },
              description: { type: 'string' }
            }
        }
      }
    }
  }, (request, reply) => {
    const { name, price, description } = request.body

    database.addProduct({
        name,
        price,
        description,
    })

    console.log(database.getProducts())
    return reply.status(201).send() //algo foi criado
});

//PUT
server.put('/products/:id',{
    schema: {
      description: 'Atualiza um produto existente',
      tags: ['Products'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', description: 'UUID do produto' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        required: ['name', 'price', 'description'],
        properties: {
          name: { type: 'string' },
          price: { type: 'number'},
          description: { type: 'string' }
        }
      },
      response: {
        204: {
            description: 'Produto atualizado com sucesso (sem conteúdo)',
            type: 'null'
          }
      }
    }
  },(request, reply) => {
    const productId = request.params.id
    const { name, price, description } = request.body

    database.updateProduct(productId, {
        name,
        price,
        description,
    })

    return reply.status(204).send //sucesso sem conteudo
});

//DELETE
server.delete('/products/:id',{
    schema: {
      description: 'Exclui um produto existente',
      tags: ['Products'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', description: 'UUID do produto' }
        },
        required: ['id']
      },
      response: {
        204: {
          description: 'Produto excluído com sucesso (sem conteúdo)',
            type: 'null'
        }
      }
    }
  },(request, reply) => {
    const productId = request.params.id

    database.deleteProduct(productId)

    return reply.status(204).send //sucesso sem conteudo
});

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