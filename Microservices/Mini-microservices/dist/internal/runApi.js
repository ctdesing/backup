"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = exports.HttpError = void 0;
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonFormat_1 = require("./jsonFormat");
class HttpError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
exports.HttpError = HttpError;
class API {
    constructor() {
        this.app = (0, express_1.default)();
        this.name = undefined;
        this.server = undefined;
    }
    set(key, value) {
        if (this[key] !== undefined) {
            return;
        }
        this[key] = value;
    }
    get(route, ...controllers) {
        this.app.get(route, ...controllers);
        return this;
    }
    post(route, ...controllers) {
        this.app.post(route, ...controllers);
        return this;
    }
    delete(route, ...controllers) {
        this.app.delete(route, ...controllers);
        return this;
    }
    put(route, ...controllers) {
        this.app.put(route, ...controllers);
        return this;
    }
    use(module) {
        this.app.use(module);
        return this;
    }
    listen(port) {
        if (!port) {
            throw new Error("port is invalid");
        }
        else if (port < 0 || port > 65535) {
            throw new Error("port must be a number between 0 and 65535");
        }
        this.app.use((req, res, next) => {
            next(new HttpError(404, "not found"));
        });
        this.app.use((error, req, res, next) => {
            console.log(`${this.name}: error occurred:\n${error.message}`);
            res.status(error.code).send((0, jsonFormat_1.formatResponse)(error.code, error.message));
        });
        this.server = (0, http_1.createServer)(this.app);
        this.server.on("error", (err) => {
            throw err;
        });
        this.server.on("listening", () => {
            console.log(`${this.name} running on http://localhost:${port}`);
        });
        this.server.listen(port);
    }
}
const createApi = (name) => {
    const api = new API();
    api.set('name', name);
    api.use(body_parser_1.default.json());
    api.use((0, helmet_1.default)());
    return api;
};
exports.createApi = createApi;
