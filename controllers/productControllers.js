//CONTROLLER products endpoint

import { DatabasePostgres } from "../models/databasePostgres.js";
const database = new DatabasePostgres();

//GET
export const getProducts = async (request, reply) => {
    const search = request.query.search
    const products = await database.getProducts(search)
    return reply.view('/views/products.ejs', { products })
}
//POST
export const postProducts = async (request, reply) => {
    const { name, price, description } = request.body
    database.addProduct({
        name,
        price,
        description,
    })
    return reply.status(201).send() //algo foi criado
}
//PUT
export const putProducts = async (request, reply) => {
    const productId = request.params.id
    const { name, price, description } = request.body

    database.updateProduct(productId, {
        name,
        price,
        description,
    })

    return reply.status(204).send //sucesso sem conteudo
}
//DELETE
export const deleteProducts = async (request, reply) => {
    const productId = request.params.id

    database.deleteProduct(productId)

    return reply.status(204).send //sucesso sem conteudo
}