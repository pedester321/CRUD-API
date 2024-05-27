import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
// import { DatabaseLocalStorage } from './database-local.js'


const database = new DatabasePostgres()
const server = fastify()
// const database = new DatabaseLocalStorage()


//GET
server.get('/', () =>{
    return 'Hello World 2'
})

server.get('/products', async (request) => {
    const search = request.query.search

    const products = database.getProducts(search)

    return products
})

//POST
server.post('/products', (request, reply) => {
    const { name, price, description } = request.body

    database.addProduct({
        name,
        price,
        description,
    })

    console.log(database.getProducts())
    return reply.status(201).send() //algo foi criado
})

//PUT
server.put('/products/:id',(request, reply) => {
    const productId = request.params.id
    const { name, price, description } = request.body

    database.updateProduct(productId, {
        name,
        price,
        description,
    })

    return reply.status(204).send //sucesso sem conteudo
})

//DELETE
server.delete('/products/:id',(request, reply) => {
    const productId = request.params.id

    database.deleteProduct(productId)

    return reply.status(204).send //sucesso sem conteudo
})

server.listen(
    {
        port:3333
    }
)