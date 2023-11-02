import { FastifyRequest, FastifyReply } from 'fastify'

import Factory from './factory'

import {
    RestaurantData
} from './validation'


export = {
    async restaurants(request: FastifyRequest, reply: FastifyReply){},
    async modify_restaurant(request: FastifyRequest, reply: FastifyReply){},
    async delete_restaurant(request: FastifyRequest, reply: FastifyReply){},

    async create_restaurant(request: FastifyRequest, reply: FastifyReply){

        let data = RestaurantData(request.body, false)

        if(!data.valid || data.errors) {
            return reply.status(400).send({
                data: "Invalid",
                success: false
            })
        }

        let result = await Factory.create_restaurant(data as any)

        if(typeof result === 'string')
            return reply.status(400).send({
                data: "Cannot create a database",
                success: false
            })

        return reply.status(201).send({
            data: null,
            success: true
        }) 
    }
}
