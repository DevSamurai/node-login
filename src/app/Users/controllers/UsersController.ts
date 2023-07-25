import { Request, Response } from 'express'

class UsersController {
  async index(_req: Request, res: Response): Promise<Response | undefined> {
    const users = [{ id: '456', email: 'someuser@example.com' }]

    return res.json(users)
  }

  // async show(req: Request, res: Response): Promise<Response> {}
  // async create(req: Request, res: Response): Promise<Response> {}
  // async update(req: Request, res: Response): Promise<Response> {}
  // async delete(req: Request, res: Response): Promise<Response> {}
}

export default new UsersController()
