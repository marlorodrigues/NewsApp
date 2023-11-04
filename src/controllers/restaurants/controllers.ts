import { FastifyRequest, FastifyReply } from 'fastify'

import Factory from './factory'

import {
    RestaurantData
} from './validation'

import { MakeResponse } from '../../helpers/replier'
import { PaginationParameters, RequireOnlyID } from '../../global/validation'

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
                data: validation.error.message,
                success: false
            })
        }

        let result = await Factory.restaurants(validation.value)
        let resp = MakeResponse(request.method as any, result, 'object')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })
    },

    async restaurant_data(request: FastifyRequest, reply: FastifyReply){
        let validation = RequireOnlyID(request.query, 'restaurant_id')

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error.message,
                success: false
            })
        }

        let result = await Factory.restaurant_data(validation.value)
        let resp = MakeResponse(request.method as any, result, 'object')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })
    },

    async create_restaurant(request: FastifyRequest, reply: FastifyReply){

        let validation = RestaurantData(request.body, false)

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error.message,
                success: false
            })
        }

        let result = await Factory.create_restaurant(validation.value)
        let resp = MakeResponse(request.method as any, result, 'boolean')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })

    },

    async modify_restaurant(request: FastifyRequest, reply: FastifyReply){
        let validation = RestaurantData(request.body, true)

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error.message,
                success: false
            })
        }
        let result = await Factory.modify_restaurant(validation.value)
        let resp = MakeResponse(request.method as any, result, 'boolean')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        })
    },

    async delete_restaurant(request: FastifyRequest, reply: FastifyReply){
        let validation = RequireOnlyID(request.query, 'restaurant_id')

        if(validation.error) {
            return reply.status(400).send({
                data: validation.error.message,
                success: false
            })
        }
        let result = await Factory.delete_restaurant(validation.value)
        let resp = MakeResponse(request.method as any, result, 'boolean')

        return reply.status(resp.code).send({
            data: resp.data,
            success: resp.success
        }) 
    },

}
