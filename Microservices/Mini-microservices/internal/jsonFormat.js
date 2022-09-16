"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
var JsonResponse = /** @class */ (function () {
    function JsonResponse(ok, code, message, content) {
        this.ok = ok;
        this.code = code;
        this.message = message;
        this.content = content;
    }
    return JsonResponse;
}());
/**
 *
 * @param params ok: boolean, code: number, message: string, content: any
 * @returns {JsonResponse}
 * @description formatResponse(content) || formatResponse(code, message) ||
 * formatResponse(ok, code, message, content)
 */
var formatResponse = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    switch (params.length) {
        case 1:
            return new JsonResponse(true, 200, null, params[0]);
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
