import { Request, Response } from 'express'

import AuthService from '@app/Auth/services/AuthService'

import AuthError from '@app/Auth/exceptions/AuthError'

class AuthController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const { user, token } = await new AuthService().signIn(email, password)

      return res.json({
        user,
        token,
      })
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(401).send()
      }

      return res.status(500).json({ error })
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    req.user.id && (await new AuthService().signOut(req.user.token))

    return res.status(200).send()
  }
}

export default new AuthController()
