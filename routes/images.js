import { DatabasePostgres } from "../database-postgres.js";
import multer from 'fastify-multer'
const database = new DatabasePostgres()


export default function (server, opts, done) {
    // Configure o multer para usar o armazenamento em memória
    const upload = multer({ dest: 'uploads/' })
    // Registrar o content parser do multer
    server.register(multer.contentParser);

    //images
    //GET
    server.get('/:id', {
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

    server.post('/',
        { 
            preValidation: [server.checkApiKey],
            preHandle: upload.single('file') 
        },
        function (request, reply) {

            const { file } = request;
            if (!file) {
                return reply.code(400).send({ error: 'No file uploaded' });
            }

            const image = {
                filename: request.body,
                data: request.file
            }

            //database.addImage(image)
            console.log(image)
            return reply.status(201).send() //algo foi criado
        });
    //POST
    // server.post('/images', {
    //     preValidation: [server.checkApiKey],
    //     preHandler: upload.single('file'),
    //     schema: {
    //         description: 'Salva uma nova imagem',
    //         tags: ['Images'],
    //         consumes: ['multipart/form-data'],
    //         body: {
    //             type: 'object',
    //             required: ['image'],
    //             properties: {
    //                 image: { type: 'string', format: 'binary' }
    //             }
    //         },
    //         security: [{ apiKey: [] }],
    //         response: {
    //             201: {
    //                 description: 'Imagem salva com sucesso',
    //                 type: 'null',
    //             },
    //         }
    //     }
    // }, async (request, reply) => {

    //     const { file } = request;
    //     if (!file) {
    //         return reply.code(400).send({ error: 'No file uploaded' });
    //     }

    //     // const image = {
    //     //     filename: file.originalname,
    //     //     data: file
    //     // };

    //     console.log(request.body, request.file.buffer)

    //     // await database.addImage(image);

    //     return reply.status(201).send() //algo foi criado
    // });
    done();
}