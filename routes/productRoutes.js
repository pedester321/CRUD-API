import { DatabasePostgres } from "../models/databasePostgres.js";
import { getProducts } from "../controllers/productControllers.js";
import { productSchemas } from "../schemas/productSchemas.js";
const database = new DatabasePostgres()


const productRoutes = async (server, options) =>{
    //GET
    server.get('/products', {
        //preValidation: [server.checkApiKey],
        schema: productSchemas.getProducts
    }, getProducts);

    //POST
    server.post('/products', {
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
    server.put('/products/:id', {
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
    server.delete('/products/:id', {
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
};

export default productRoutes;