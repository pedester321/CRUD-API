export const productSchemas = {
    getProducts: {
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
    },
    postProducts:{
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
    },
    putProducsts:{
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
    },
    deleteProducts:{
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
}