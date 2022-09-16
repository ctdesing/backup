
class JsonResponse {
    ok: boolean
    code: number
    message: string
    content: any

    constructor(ok: boolean, code: number, message: string, content: any) {
        this.ok = ok
        this.code = code
        this.message = message
        this.content = content
    }
}

/**
 *
 * @param params ok: boolean, code: number, message: string, content: any
 * @returns {JsonResponse}
 * @description formatResponse(content) || formatResponse(code, message) ||
 * formatResponse(ok, code, message, content)
 */
export const formatResponse = (...params: any[]): JsonResponse => {
    switch (params.length) {
        case 1:
            return new JsonResponse(true, 200, "", params[0])
        case 2:
            return new JsonResponse(false, params[0], params[1], null)
        case 4:
            return new JsonResponse(params[0], params[1], params[2], params[3])
        default:
            throw new Error("invalid parameters, either send content, code" +
                " and message or ok, code, message and content")
    }
}