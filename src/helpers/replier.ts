type ReplyTypes = 'string' | 'object' | 'boolean'

export function MakeResponse(controller_result: any, expected_type: ReplyTypes) {

    if(typeof controller_result === expected_type)
        return {
            code: 200,
            data: null,
            success: true
        }


    return {
        code: 400,
        data: controller_result,
        success: false
    }
}