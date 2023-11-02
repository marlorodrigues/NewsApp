import { Restaurants } from '../../database/prisma'

import RuntimeError from '../../utils/errors'
import logger from '../../utils/logger'


interface Restaurant {
    register_id: string
    name: string
    address: string
    company_register: string
    type: Array<number>
}

export = {
    async create_restaurant(data: Restaurant): Promise<string | boolean> {
        try{
            let exits = await Restaurants.findFirst({
                where: {
                    company_register: data.company_register
                },
                select: {
                    restaurant_id: true
                }
            })

            if(exits)
                throw new RuntimeError("Restaurante já existe", '1001');

            await Restaurants.create({
                data: { ...data },
                select: {
                    restaurant_id: true
                }
            })

            return true
        }
        catch(error: any){
            logger.error(`${error.name} - ${error.message} - ${error.stack}`)

            if(error instanceof RuntimeError)
                return error.message

            return error.message
        }
    }
}