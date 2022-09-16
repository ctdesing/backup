"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
class JsonResponse {
    constructor(ok, code, message, content) {
        this.ok = ok;
        this.code = code;
        this.message = message;
        this.content = content;
    }
}
const formatResponse = (...params) => {
    switch (params.length) {
        case 1:
            return new JsonResponse(true, 200, "", params[0]);
        case 2:
            return new JsonResponse(false, params[0], params[1], null);
        case 4:
            return new JsonResponse(params[0], params[1], params[2], params[3]);
        default:
            throw new Error("invalid parameters, either send content, code" +
                " and message or ok, code, message and content");
    }
};
exports.formatResponse = formatResponse;
