import { FastifyRequest, FastifyReply } from 'fastify'

import Factory from './factory'

import {
    RestaurantData
} from './validation'

import { MakeResponse } from '../../helpers/replier'
import { PaginationParameters } from '../../global/validation'



export = {
    async restaurants(request: FastifyRequest, reply: FastifyReply){
        let validation = PaginationParameters(request.query, {
            direction: "desc",
            limit: 10,
            order: "restaurant_id",
            page: 1,
            start_date: null,
            end_date: null,
            status: null,
            where: null
        })

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error,
                success: false
            })
        }

        let result = await Factory.restaurants(validation.value)
        let resp = MakeResponse(result, 'boolean')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })
    },
    
    async delete_restaurant(request: FastifyRequest, reply: FastifyReply){},

    async create_restaurant(request: FastifyRequest, reply: FastifyReply){

        let validation = RestaurantData(request.body, false)

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error,
                success: false
            })
        }

        let result = await Factory.create_restaurant(validation.value)
        let resp = MakeResponse(result, 'boolean')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })
    },

    async modify_restaurant(request: FastifyRequest, reply: FastifyReply){
        let validation = RestaurantData(request.body, true)

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error,
                success: false
            })
        }
        let result = await Factory.modify_restaurant(request.body as any)
        let resp = MakeResponse(result, 'boolean')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })
    },
}
