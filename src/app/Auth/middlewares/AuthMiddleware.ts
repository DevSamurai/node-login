import { NextFunction, Request, Response } from 'express'

import AuthService from '@app/Auth/services/AuthService'

import AuthError from '@app/Auth/exceptions/AuthError'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send({ error: 'No token provided' })

  const [, token] = authHeader.split(' ')

  try {
    const id = await new AuthService().validateToken(token)

    req.user = { id, token }

    return next()
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).send()
    }

    return res.status(500).send({ error })
  }
}
