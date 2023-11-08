import { Restaurants } from '../../database/prisma'

import RuntimeError from '../../utils/errors'
import logger from '../../utils/logger'
import { Listing } from '../../global/types'

interface Restaurant {
    restaurant_id: bigint | string | null 
    name: string
    address: string
    company_register: string
    type: Array<number>
    image: string
}

async function lookup_restaurant(company_register: string | null, restaurant_id: string | bigint | null){
    let lookup = company_register ? 'company_register' : 'restaurant_id'
    let where = company_register ? company_register : BigInt(restaurant_id!)

    let exits = await Restaurants.findFirst({
        where: {
            [lookup]: where
        },
        select: {
            restaurant_id: true
        }
    })

    if(exits)
        throw new RuntimeError("Restaurante já existe", '1001');

    return;
}

export = {

    async restaurants({ page, limit, order, direction }: Listing){
        try{
            let offset = (Number(page) - 1) * Number(limit)

            let restaurants = await Restaurants.findMany({
                select: {
                    address: true,
                    created_at: true,
                    name: true,
                    restaurant_id: true,
                    types: true,
                    image: true
                },
                skip: offset,
                take: Number(limit),
                orderBy: {
                    [order]: direction
                },
                where: {
                    deleted_at: null
                }
            })

            let total_data = await Restaurants.count({
                where: {
                    deleted_at: null
                }
            })

            return {
                data: restaurants.map(x => {
                    let { restaurant_id, image, ...rest } = x

                    return {
                        restaurant_id: restaurant_id.toString(),
                        image: image,
                        ...rest
                    }
                }),
                meta: {
                    current_page: page,
                    total_data: total_data,
                    total_pages: Math.ceil(total_data / limit),
                }
            }

        }
        catch(error: any){
            logger.error(`${error.name} - ${error.message} - ${error.stack}`)

            return error
        }
    },

    async restaurant_data(data: Restaurant){
        try{
            let restaurant = Restaurants.findUniqueOrThrow({
                where: {
                    restaurant_id: BigInt(data.restaurant_id!)
                },
                select: {
                    name: true,
                    address: true,
                    company_register: true,
                    types: true,
                    image: true,
                    created_at: true
                }
            })

            return {
                restaurant_id: data.restaurant_id,
                ...restaurant
            }
            
        }
        catch(error: any){
            logger.error(`${error.name} - ${error.message} - ${error.stack}`)

            return error
        }
    },

    async create_restaurant(data: Restaurant): Promise<string | boolean> {
        try{
            await lookup_restaurant(data.company_register, null)

            let { restaurant_id, ...rest } = data

            rest.image = "https://google.com.br";

            await Restaurants.create({
                data: { 
                    ...rest
                },
                select: {
                    restaurant_id: true
                }
            })

            return true
        }
        catch(error: any){
            logger.error(`${error.name} - ${error.message} - ${error.stack}`)

            return error
        }
    },

    async modify_restaurant(data: Restaurant) {
        try{
            await lookup_restaurant(null, data.restaurant_id)

        }
        catch(error: any){
            logger.error(`${error.name} - ${error.message} - ${error.stack}`)

            return error
        }
    },

    async delete_restaurant(data: Restaurant){
        try{
            let exits = await Restaurants.findFirst({
                where: { restaurant_id: BigInt(data.restaurant_id!) },
                select: { restaurant_id: true }
            })
        
            if(exits)
                throw new RuntimeError("Restaurante não encontrado", '1002');

            await Restaurants.update({
                where: {
                    restaurant_id: BigInt(data.restaurant_id!)
                },
                data: {
                    deleted_at: new Date()
                }
            })
        }
        catch(error: any){
            logger.error(`${error.name} - ${error.message} - ${error.stack}`)

            return error
        }
    }
}