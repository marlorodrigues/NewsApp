import { FastifyInstance } from 'fastify'
import { Node_Env } from './types/global'

const env: Node_Env = require('../.env.json')

import fs from 'fs'
import path from 'path'
import cors from '@fastify/cors'
import compress from '@fastify/compress'

import helpers from './helpers/index'
import routes from './controllers/index'

import Etag from '@fastify/etag'
import logger from './utils/logger'

async function __init__() {
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
        import('@fastify/compress'),
        {
            threshold: 1024,
            global: true,
            encodings: ['gzip'],
            inflateIfDeflated: true,
            zlibOptions: {
                level: 9,
            }
        }
    )

    await fastify.register(Etag, {
        algorithm: 'sha1'
    })

    await fastify.register(cors, {
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
    fastify.addHook('onRequest', hooks.valid_request)
    // fastify.addHook('onSend', hooks.valid_eTAG) //Fastify already do this internally
}

export default __init__