import { DatabasePostgres } from "../database-postgres.js";
const database = new DatabasePostgres()

export default function (server, opts, done) {

    //products
    //GET
    server.get('/', {
        preValidation: [server.checkApiKey],
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
            security: [{ apiKey: [] }],
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
    }, async (request) => {
        const search = request.query.search

        const products = database.getProducts(search)

        return products
    });

    //POST
    server.post('/', {
        preValidation: [server.checkApiKey],
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
            security: [{ apiKey: [] }],
            response: {
                201: {
                    description: 'Produto criado com sucesso',
                    type: 'null',

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

        return reply.status(201).send() //algo foi criado
    });

    //PUT
    server.put('/:id', {
        preValidation: [server.checkApiKey],
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
                    price: { type: 'number' },
                    description: { type: 'string' }
                }
            },
            security: [{ apiKey: [] }],
            response: {
                204: {
                    description: 'Produto atualizado com sucesso (sem conteúdo)',
                    type: 'null'
                }
            }
        }
    }, (request, reply) => {
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
    server.delete('/:id', {
        preValidation: [server.checkApiKey],
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
            security: [{ apiKey: [] }],
            response: {
                204: {
                    description: 'Produto excluído com sucesso (sem conteúdo)',
                    type: 'null'
                }
            }
        }
    }, (request, reply) => {
        const productId = request.params.id

        database.deleteProduct(productId)

        return reply.status(204).send //sucesso sem conteudo
    });
    done();
}