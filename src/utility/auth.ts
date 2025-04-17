import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET } from '../globals'

export interface InterfaceJwtPayload {
  tokenVersion: number | string
  userId: string
  email: string
}

export interface InterfaceUser {
  id: string
  email: string
  password: string
  role: string
}

export const createAccessToken = (user: InterfaceUser): string => {
  return jwt.sign(
    {
      userId: user.id.toString(),
      email: user.email,
      password: user.password,
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    }
  )
}
