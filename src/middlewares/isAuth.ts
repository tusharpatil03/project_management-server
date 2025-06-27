import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../globals';


export interface InterfaceAuthData {
  isAuth: boolean;
  expired: boolean | undefined;
  userId: string;
}

export const isAuth = (request: Request): InterfaceAuthData => {
  const authData: InterfaceAuthData = {
    isAuth: false,
    expired: undefined,
    userId: "",
  };

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return authData;
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    return authData;
  }


  let decodedToken: any;
  try {
    decodedToken = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log(err.message);
          return err;
        }
        return decoded;
      }
    );

    if (decodedToken.name === 'TokenExpiredError') {
      authData.expired = true;
      return authData;
    }

    if (decodedToken.message === 'invalid token') {
      return authData
    }
  } catch (e) {
    authData.expired = true;
    return authData;
  }

  if (!decodedToken) {
    return authData;
  }

  if (decodedToken.userId) {
    authData.isAuth = true;
  }
  authData.userId = decodedToken.userId;

  return authData;
};
