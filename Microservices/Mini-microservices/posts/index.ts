import { Response, Request, NextFunction } from "express";
import { HttpError, createApi } from '../internal/runApi'
import generateRandomID from "../internal/getRandomID";
import { formatResponse } from '../internal/jsonFormat'

class Post {
    id: string
    title: string

    constructor(id: string, title: string) {
        this.id = id
        this.title = title
    }
}

const PORT = 3001
const posts: Post[] = []

const api = createApi("Post Microservice")


api.get('/posts', (req: Request, res: Response) => {
    res.send(formatResponse(posts))
})

api.post('/posts', (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.title) {
        return next(new HttpError(500, "Cannot destructure property 'title'" +
            " of 'req.body' as it is undefined."))
    }

    const id = generateRandomID(8)
    const { title } = req.body
    posts.push(new Post(id, title))

    res.status(201).send(formatResponse(posts[posts.length-1]))
})

api.listen(PORT)
// "nodemon dist/posts" "nodemon dist/comments"