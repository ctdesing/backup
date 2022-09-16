"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runApi_1 = require("internal/runApi");
var getRandomID_1 = require("internal/getRandomID");
var PORT = 3002;
var comments = {};
var api = (0, runApi_1.createApi)("Comments Microservice");
api.get('/posts/:id/comments', function (req, res, next) {
    var id = req.params.id;
    if (!id) {
        return next(new runApi_1.HttpError(400, "Bad request"));
    }
    else if (!comments[id]) {
        return next(new runApi_1.HttpError(404, "Comment not found"));
    }
    res.send(comments[id]);
});
api.post('/posts/:id/comment', function (req, res, next) {
    var content = req.body.content;
    var commentID = req.params.id;
    if (!content || !commentID) {
        return next(new runApi_1.HttpError(400, "Bad request"));
    }
    var id = (0, getRandomID_1.default)(8);
    if (!comments[commentID]) {
        comments[commentID] = [];
    }
    comments[commentID].push({ id: id, content: content });
    res.send(comments[commentID]);
});
api.listen(PORT);
