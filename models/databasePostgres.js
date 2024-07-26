import { randomUUID } from "node:crypto"
import sql from './postgresClient.js'

export class DatabasePostgres {

    //products
    //create
    async addProduct(product) {
        const productId = randomUUID()

        const { name, price, description } = product

        await sql`insert into products (id, name, price, description) VALUES (${productId}, ${name}, ${price}, ${description})`
    }

    //read
    async getProducts(search) {
        let products

        if (search) {
            products = await sql`select * from products where name ilike ${'%' + search + '%'}`
        } else {
            products = await sql`select * from products`
        }

        return products
    }

    //update
    async updateProduct(id, product) {
        const { name, price, description } = product


        await sql`update products set name = ${name}, price = ${price}, description = ${description} WHERE id = ${id}`
    }

    //delete
    async deleteProduct(id) {
        await sql`delete from products where id = ${id}`
    }

    //images
    //create
    async addImage(image) {
        const{filename, data} = image

        await sql`
          INSERT INTO images (filename, data)
          VALUES (${filename}, ${data})
        `;
    }

    //read
    async getImage(id) {
        image = await sql`select data from images where id = ${id}`
        return image.rows[0].data
    }
}