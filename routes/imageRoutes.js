import { DatabasePostgres } from "../models/databasePostgres.js";
const database = new DatabasePostgres()


export default function (server, opts, done) {


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
        const imageBuffer = await database.getImage(request.params.id);
        reply.type('image/jpeg').send(imageBuffer);
    });


    //POST
    server.post('/',
        {
            preValidation: [server.checkApiKey],
        },
        async function (request, reply) {

            const data = await request.file()

            const buffer = await data.toBuffer()

            const image = {
                filename: data.filename,
                data: buffer
            }
            database.addImage(image)
            // console.log(image)
            return reply.status(201).send() //algo foi criado
        });
    //POST
    // server.post('/images', {
    //     preValidation: [server.checkApiKey],
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