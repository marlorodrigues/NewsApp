import Ajv from "ajv"

const ajv = new Ajv()

export function RestaurantData(data: any, is_update: boolean) {
    let required_fields = ["name", "address", "types", "company_register"]

    if(is_update)
        required_fields.push("restaurant_id")
    else
        required_fields = required_fields.filter(x => x != "company_register")

    let schema = {
        type: "object",
        properties: {
            name: { type: "string" },
            address: { type: "string" },
            types: { 
                type: "array",
                items: { type: "number" }
            }
        },
        required: required_fields,
        additionalProperties: false
    }

    let validate = ajv.compile(schema)
    let valid = validate(data)
    
    return {
        valid: valid,
        errors: validate?.errors
    }
}