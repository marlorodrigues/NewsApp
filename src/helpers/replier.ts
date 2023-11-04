import RuntimeError from '../utils/errors'

type ReplyTypes = 'string' | 'object' | 'boolean' | 'array'

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD'

const STATUS_CODES = {
    "SUCCESS": 200,                         // Generic success response
    "ACCEPTED": 201,                        // Request accept, but the awnser its not available yet
    "NO_CONTENT": 204,                      // Success, but no content to reply
    "PARTIAL_CONTENT": 206,                 // Success, but has only a part of content
    "BAD_REQUEST": 400,                     // Fail to accept request, or its malformed or data is invalid
    "UNAUTHORIZED": 401,                    // Fail to authorize
    "NOT_FOUND": 404,                       // Content requested not found
    "CONFLICT": 409,                        // The request put some resource in conflict state (ex: try create something that already exists)
    "IM_A_TEAPOT": 418,                     // Im a Teapot, Morty!!!!!
    "LOCKED": 423,                          // Resource is blocked
    "UNAVAILABLE_FOR_LEGAL_REASONS": 451,   // The governement found me and i in jail
    "INTERNAL_ERROR": 500,                  // Internal error on server
    "NOT_IMPLEMENTED": 501                  // Feature its not available yet
}


function check_data(data: any, expected: ReplyTypes){
    switch (expected) {
        case "array":
            if (Array.isArray(data)) return true
            break;
        case "string":
            if (typeof data == "string") return true
            break;
        case "boolean":
            if (typeof data == "object") return true
            break;
        case "object":
            if (typeof data == "object") return true
            break;
        default:
            break;
    }

    return false
}

export function MakeResponse(method: RequestMethods, controller_result: any, expected_type: ReplyTypes) {

    if (controller_result instanceof RuntimeError)
        return {
            code: STATUS_CODES.BAD_REQUEST,
            data: controller_result.message,
            success: false
        }

    if (controller_result instanceof Error)
        return {
            code: STATUS_CODES.INTERNAL_ERROR,
            data: controller_result.message,
            success: false
        }

    let status_code = STATUS_CODES.IM_A_TEAPOT
    let success = false
    switch (method) {
        case 'GET':
            success = check_data(controller_result, expected_type)

            if(success) status_code = STATUS_CODES.SUCCESS
            else        status_code = STATUS_CODES.BAD_REQUEST

            break;
        case 'POST':
            success = check_data(controller_result, expected_type)

            if(success) status_code = STATUS_CODES.SUCCESS
            else        status_code = STATUS_CODES.BAD_REQUEST

            break;
        case "PUT":

            success = check_data(controller_result, expected_type)

            if(success) status_code = STATUS_CODES.NO_CONTENT
            else        status_code = STATUS_CODES.BAD_REQUEST

            break;
        case "DELETE":

            success = check_data(controller_result, expected_type)

            if(success) status_code = STATUS_CODES.NO_CONTENT
            else        status_code = STATUS_CODES.BAD_REQUEST

            break;
        case "HEAD":

            success = check_data(controller_result, expected_type)

            if(success) status_code = STATUS_CODES.NO_CONTENT
            else        status_code = STATUS_CODES.BAD_REQUEST

            break;
        default:
            break;
    }

    return {
        code: status_code,
        data: controller_result,
        success: success
    }
}