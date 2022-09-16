"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = exports.HttpError = void 0;
var http_1 = require("http");
var express_1 = require("express");
var helmet_1 = require("helmet");
var body_parser_1 = require("body-parser");
var jsonFormat_1 = require("./jsonFormat");
var HttpError = /** @class */ (function () {
    function HttpError(code, message) {
        this.code = code;
        this.message = message;
    }
    return HttpError;
}());
exports.HttpError = HttpError;
var API = /** @class */ (function () {
    function API() {
        this.app = (0, express_1.default)();
        this.name = undefined;
    }
    API.prototype.set = function (key, value) {
        if (this[key] !== undefined) {
            return;
        }
        this[key] = value;
    };
    API.prototype.get = function (route) {
        var _a;
        var controllers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            controllers[_i - 1] = arguments[_i];
        }
        (_a = this.app).get.apply(_a, __spreadArray([route], controllers, false));
        return this;
    };
    API.prototype.post = function (route) {
        var _a;
        var controllers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            controllers[_i - 1] = arguments[_i];
        }
        (_a = this.app).post.apply(_a, __spreadArray([route], controllers, false));
        return this;
    };
    API.prototype.delete = function (route) {
        var _a;
        var controllers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            controllers[_i - 1] = arguments[_i];
        }
        (_a = this.app).delete.apply(_a, __spreadArray([route], controllers, false));
        return this;
    };
    API.prototype.put = function (route) {
        var _a;
        var controllers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            controllers[_i - 1] = arguments[_i];
        }
        (_a = this.app).put.apply(_a, __spreadArray([route], controllers, false));
        return this;
    };
    API.prototype.use = function (module) {
        this.app.use(module);
        return this;
    };
    API.prototype.listen = function (port) {
        var _this = this;
        if (!port) {
            throw new Error("port is invalid");
        }
        else if (typeof port !== 'number' || port < 0 || port > 65535) {
            throw new Error("port must be a number between 0 and 65535");
        }
        /* catch all */
        this.app.use(function (req, res, next) {
            next(new HttpError(404, "not found"));
        });
        // error handler
        this.app.use(function (error, req, res, next) {
            console.log("".concat(_this.name, ": error occurred:\n").concat(error.message));
            res.status(error.code).send((0, jsonFormat_1.formatResponse)(error.code, error.message));
        });
        this.server = (0, http_1.createServer)(this.app);
        this.server.on("error", function (err) {
            throw err;
        });
        this.server.on("listening", function () {
            console.log("".concat(_this.name, " running on http://localhost:").concat(port));
        });
        this.server.listen(port);
    };
    return API;
}());
var createApi = function (name) {
    var api = new API();
    api.set('name', name);
    // plugins
    api.use(body_parser_1.default.json());
    api.use((0, helmet_1.default)());
    return api;
};
exports.createApi = createApi;
