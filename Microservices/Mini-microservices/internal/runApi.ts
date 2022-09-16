import {createServer, Server} from "http"
import express, {Express, NextFunction, Request, Response} from 'express'
import helmet from "helmet";
import bodyParser from 'body-parser'
import {formatResponse} from "./jsonFormat";

export class HttpError {
    code: number
    message: string

    constructor(code: number, message: string) {
        this.code = code
        this.message = message
    }
}

type Controller = (req: Request, res: Response, next: NextFunction) => void

class API {
    [key: string]: any
    app: Express
    name: string | undefined
    server: Server | undefined

    constructor() {
        this.app = express()
        this.name = undefined
        this.server = undefined
    }

    set(key: any, value: any) {
        if (this[key] !== undefined) {
            return
        }

        this[key] = value
    }

    get(route: string, ...controllers: Controller[]) {
        this.app.get(route, ...controllers)
        return this
    }

    post(route: string, ...controllers: Controller[]) {
        this.app.post(route, ...controllers)
        return this
    }

    delete(route: string, ...controllers: Controller[]) {
        this.app.delete(route, ...controllers)
        return this
    }

    put(route: string, ...controllers: Controller[]) {
        this.app.put(route, ...controllers)
        return this
    }

    use(module: express.RequestHandler) {
        this.app.use(module)
        return this
    }

    listen(port: number) {
        if (!port) {
            throw new Error("port is invalid")
        } else if (port < 0 || port > 65535) {
            throw new Error("port must be a number between 0 and 65535")
        }

        /* catch all */
        this.app.use((req, res, next) => {
            next(new HttpError(404, "not found"))
        })

        // error handler
        this.app.use((error: HttpError, req: Request, res: Response, next: express.NextFunction) => {
            console.log(`${this.name}: error occurred:\n${error.message}`)
            res.status(error.code).send(formatResponse(error.code, error.message))
        })

        this.server = createServer(this.app)

        this.server.on("error", (err) => {
            throw err
        })

        this.server.on("listening", () => {
            console.log(`${this.name} running on http://localhost:${port}`)
        })

        this.server.listen(port)
    }
}

export const createApi = (name: string): API => {
    const api = new API()
    api.set('name', name)
    // plugins
    api.use(bodyParser.json())
    api.use(helmet())

    return api
}