import { HttpError, createApi } from '../internal/runApi'
import generateRandomID from "../internal/getRandomID";
import { formatResponse } from '../internal/jsonFormat'

const PORT = 3002

class Comment {
    id: string
    content: string

    constructor(id: string, content: string) {
        this.id = id
        this.content = content
    }
}

const comments: {[key: string]: Comment[]} = {}

const api = createApi("Comments Microservice")


api.get('/posts/:id/comments', (req, res, next) => {
    const { id }: {id?: string} = req.params
    if (!id) {
        return next(new HttpError(400, "Bad request"))
    } else {
        if (!comments[id]) {
                return res.send(formatResponse([]))
            }
    }


    res.send(formatResponse(comments[id]))
})

api.post('/posts/:id/comments', (req, res, next) => {
    const { content } = req.body
    const id = req.params.id
    if (!content || !id) {
        return next(new HttpError(400, "Bad request"))
    }

    const newID = generateRandomID(8)

    if (!comments[id]) {
        comments[id] = []
    }

    const comment = new Comment(newID, content)
    comments[id].push(comment)

    res.send(comment)
})

api.listen(PORT)