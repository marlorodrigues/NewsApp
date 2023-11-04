import Joi from "joi"


export function RestaurantData(data: any, require_id: boolean) {
    let schema: Joi.ObjectSchema<any>

    if(require_id){
        schema = Joi.object({
            restaurant_id: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            types: Joi.array<number>().required(),
            company_register: Joi.string().required(),
        }).required()
    }
    else {
        schema = Joi.object({
            restaurant_id: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            types: Joi.array<number>().required(),
            company_register: Joi.string().required(),
        }).required()
    }

    return schema.validate(data)
}

