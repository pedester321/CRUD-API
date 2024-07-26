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
}