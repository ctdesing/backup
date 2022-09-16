"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runApi_1 = require("../internal/runApi");
const getRandomID_1 = __importDefault(require("../internal/getRandomID"));
const jsonFormat_1 = require("../internal/jsonFormat");
const PORT = 3002;
class Comment {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}
const comments = {};
const api = (0, runApi_1.createApi)("Comments Microservice");
api.get('/posts/:id/comments', (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new runApi_1.HttpError(400, "Bad request"));
    }
    else {
        if (!comments[id]) {
            return res.send((0, jsonFormat_1.formatResponse)([]));
        }
    }
    res.send((0, jsonFormat_1.formatResponse)(comments[id]));
});
api.post('/posts/:id/comments', (req, res, next) => {
    const { content } = req.body;
    const id = req.params.id;
    if (!content || !id) {
        return next(new runApi_1.HttpError(400, "Bad request"));
    }
    const newID = (0, getRandomID_1.default)(8);
    if (!comments[id]) {
        comments[id] = [];
    }
    const comment = new Comment(newID, content);
    comments[id].push(comment);
    res.send(comment);
});
api.listen(PORT);
