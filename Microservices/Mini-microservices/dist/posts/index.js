"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runApi_1 = require("../internal/runApi");
const getRandomID_1 = __importDefault(require("../internal/getRandomID"));
const jsonFormat_1 = require("../internal/jsonFormat");
class Post {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}
const PORT = 3001;
const posts = [];
const api = (0, runApi_1.createApi)("Post Microservice");
api.get('/posts', (req, res) => {
    res.send((0, jsonFormat_1.formatResponse)(posts));
});
api.post('/posts', (req, res, next) => {
    if (!req.body.title) {
        return next(new runApi_1.HttpError(500, "Cannot destructure property 'title'" +
            " of 'req.body' as it is undefined."));
    }
    const id = (0, getRandomID_1.default)(8);
    const { title } = req.body;
    posts.push(new Post(id, title));
    res.status(201).send((0, jsonFormat_1.formatResponse)(posts[posts.length - 1]));
});
api.listen(PORT);
