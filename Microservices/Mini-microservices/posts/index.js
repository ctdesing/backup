"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runApi_1 = require("../internal/runApi");
var getRandomID_js_1 = require("internal/getRandomID.js");
var jsonFormat_1 = require("../internal/jsonFormat");
var PORT = 3001;
var posts = [];
var api = (0, runApi_1.createApi)("Post Microservice");
api.get('/posts', function (req, res) {
    res.send((0, jsonFormat_1.formatResponse)(posts));
});
api.post('/posts', function (req, res, next) {
    if (!req.body.title) {
        return next(new runApi_1.HttpError(500, "Cannot destructure property 'title'" +
            " of 'req.body' as it is undefined."));
    }
    var id = (0, getRandomID_js_1.default)(8);
    var title = req.body.title;
    posts.push({ id: id, title: title });
    res.status(201).send((0, jsonFormat_1.formatResponse)(posts[posts.length - 1]));
});
api.listen(PORT);
