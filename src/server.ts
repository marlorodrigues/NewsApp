import { FastifyInstance } from 'fastify'

import fs from 'fs'
import path from 'path'

import routes from './controllers/index'
import logger from './utils/logger'
import gracefully from './utils/gracefully'

async function init_http_server() {
    const fastify: FastifyInstance = require('fastify')({
        logger: false,
        http2: false,
        compress: true,
        //https: {
            //allowHTTP1: true,
            //key: fs.readFileSync(env.DEV_PRIVATE_KEY),
            //cert: fs.readFileSync(env.DEV_CERTIFICATE)
        //}
    })

    await registers(fastify)
    await add_hooks(fastify)
    await add_routes(fastify)

    return fastify
}

async function registers(fastify: FastifyInstance) {
    await fastify.register(
        await import('@fastify/compress'),
        {
            threshold: 1024,
            global: true,
            encodings: ['gzip'],
            inflateIfDeflated: true,
            zlibOptions: {
                level: 9,
            },
        }
    )

    await fastify.register(await import('@fastify/etag'), {
        algorithm: 'sha1',
        weak: false
    })

    await fastify.register(await import('@fastify/cors'), {
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Content-Encoding', "Accept-Encoding", 'Cache-Control'],
        methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
        optionsSuccessStatus: 204,
        origin: '*'
    })
}

async function add_routes(fastify: FastifyInstance) {
    try {
        const arr = await routes.handlers()

        arr.forEach((route: any) => {
            fastify.route(route)    
        })
    }
    catch (error: any) {
        logger.info(`Check the last change at route's files.`)
        logger.error(`${error.message} - ${error.stack}`)
    }
}

async function add_hooks(fastify: FastifyInstance) {
    // fastify.addHook('onRequest', hooks.valid_request)
    // fastify.addHook('onSend', hooks.valid_eTAG) //Fastify already do this internally
}

process.on('SIGINT', gracefully.SIGINT)
process.on('uncaughtException', gracefully.uncaughtException)
process.on('unhandledRejection', gracefully.unhandledRejection)

async function __init__(){
    const server = await init_http_server()

    server.listen({ port: 3000 }, (error: any, address: string) => {
        if (error)
            logger.info(`${error.message} - ${error.stack}`)
        else {
            logger.info(`Server Running on ${address}`)
        }
    })
}

__init__()