import { DatabasePostgres } from "../database-postgres.js";
import multer from 'fastify-multer'
const database = new DatabasePostgres()

// Configurando Multer para lidar com uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default function (server, opts, done) {

    server.register(multer.contentParser)
    //images
    //GET
    server.get('/images/:id', {
        preValidation: [server.checkApiKey],
        schema: {
            description: 'Retorna uma imagem',
            tags: ['Images'],
            security: [{ apiKey: [] }],
            response: {
                200: {
                    description: 'Uma imagem',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            data: { type: 'string', format: 'binary' }
                        }
                    }
                }
            }
        }
    }, async (request) => {
        const imageId = request.params.id
        const image = database.getImage(imageId)
        return image
    });

    //POST
    server.post('/images', {
        preValidation: [server.checkApiKey],
        schema: {
            description: 'Salva uma nova imagem',
            tags: ['Images'],
            consumes: ['multipart/form-data'],
            body: {
                type: 'object',
                required: ['image'],
                properties: {
                    image: { type: 'string', format: 'binary' }
                }
            },
            security: [{ apiKey: [] }],
            preHandler: upload.single('image'),
            response: {
                201: {
                    description: 'Imagem salva com sucesso',
                    type: 'null',
                },
            }
        }
    }, (request, reply) => {
        const { data } = request.raw;
        const filename = request.body.filename;


        database.addImage({
            filename,
            data: data
        });

        return reply.status(201).send() //algo foi criado
    });
    done();
}