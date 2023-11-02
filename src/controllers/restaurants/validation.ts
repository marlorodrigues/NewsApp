import Joi from "joi"


export function RestaurantData(data: any, is_update: boolean) {
    let required_fields = ["name", "address", "types", "company_register"]

    if(is_update)
        required_fields.push("restaurant_id")
    else
        required_fields = required_fields.filter(x => x != "company_register")

    let schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        types: Joi.array<number>().required()
    })


    return schema.validate(data)
}

