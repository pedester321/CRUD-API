import { randomUUID } from "node:crypto"
import sql from './db.js'

export class DatabasePostgres{
    
    async addProduct(product){
        const productId = randomUUID()
        
        const {name, price, description} = product

        await sql`insert into products (id, name, price, description) VALUES (${productId}, ${name}, ${price}, ${description})`
    }

    //read
    async getProducts(search){
        let products

        if (search ){
            products = await sql`select * from products where name ilike ${'%'+search+'%'}` 
        }else{
            products = await sql`select * from products`
        }

        return products
    }

    //update
    async updateProduct(id, product){
        const {name, price, description} = product


        await sql`update products set name = ${name}, price = ${price}, description = ${description} WHERE id = ${id}`
    }

    //delete
    async deleteProduct(id){
        await sql`delete from products where id = ${id}`
    }
}