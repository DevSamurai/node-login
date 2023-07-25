import cors from 'cors'
import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
} from 'express'
import 'express-async-errors'
import Youch from 'youch'

import routes from '@/routes'

export default class App {
  private app: Application
  private nodeEnv: 'development' | 'production'

  constructor(nodeEnv: 'development' | 'production') {
    this.app = express()
    this.nodeEnv = nodeEnv

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`⚡ server running on port ${port}`)
    })
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
  }

  private routes(): void {
    this.app.use(routes)
  }

  private exceptionHandler(): void {
    this.app.use(
      async (err: ErrorRequestHandler, req: Request, res: Response) => {
        if (this.nodeEnv === 'development') {
          const errors = await new Youch(err, req).toJSON()
          return res.status(500).json(errors)
        }

        return res.status(500).json({ error: 'Internal server error' })
      },
    )
  }
}
