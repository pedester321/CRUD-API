import { randomUUID } from "node:crypto"

export class DatabaseLocalStorage{
    //Cria ou carrega um vetor de objetos que sera a lista de produtos
    #products = new Map()


    addProduct(product){
        const productId = randomUUID()
        this.#products.set(productId, product)
    }

    //read
    getProducts(){
        return Array.from(this.#products.entries()).map((productArray)=> {
            const id = productArray[0]
            const data = productArray[1]

            return{
                id,
                ...data, //spread operator
            }
        })
    }

    //update
    updateProduct(id, product){
        this.#products.set(id, product)
    }

    //delete
    deleteProduct(id){
        this.#products.delete(id)
    }
}