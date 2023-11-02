import { ValidListing } from "./types"
import Joi from "joi"


export function PaginationParameters(data: any, default_values: ValidListing){
    let schema = Joi.object({
        page: Joi.number().default(default_values.page),
        limit: Joi.number().default(default_values.limit).max(100),
        order: Joi.string().default(default_values.order),
        direction: Joi.string().default(default_values.direction).allow(["asc", "desc"]),
        where: Joi.string().default(default_values.where),
        status: Joi.string().default(default_values.status),
        start_date: Joi.string().isoDate().default(default_values.start_date),
        end_date: Joi.string().isoDate().default(default_values.end_date),
    }).required()

    return schema.validate(data)
}