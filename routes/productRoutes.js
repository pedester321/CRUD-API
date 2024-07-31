import { deleteProducts, getProducts, postProducts, putProducts } from "../controllers/productControllers.js";
import { productSchemas } from "../schemas/productSchemas.js";

const productRoutes = async (server, options) =>{
    //GET
    server.get('/products', {
        //preValidation: [server.checkApiKey],
        schema: productSchemas.getProducts
    }, getProducts);

    //POST
    server.post('/products', {
        preValidation: [server.checkApiKey],
        schema: productSchemas.postProducts
    }, postProducts)

    //PUT
    server.put('/products/:id', {
        preValidation: [server.checkApiKey],
        schema: productSchemas.putProducsts
    }, putProducts);

    //DELETE
    server.delete('/products/:id', {
        preValidation: [server.checkApiKey],
        schema: productSchemas.deleteProducts
    }, deleteProducts);
};

export default productRoutes;