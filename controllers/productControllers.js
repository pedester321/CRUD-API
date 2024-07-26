//CONTROLLER products endpoint

import { DatabasePostgres } from "../models/databasePostgres.js";
const database = new DatabasePostgres();

//GET
export const getProducts = async (request, reply) =>{
    const search = request.query.search
    const products = await database.getProducts(search)
    return reply.view('products.ejs',{products})
}