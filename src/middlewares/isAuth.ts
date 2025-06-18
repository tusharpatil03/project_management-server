import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../globals';
import { PrismaClientType } from '../db';


// This interface represents the type of data object returned by isAuth function.
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

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];


  if (!token || token === '') {
    return authData;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          //console.log(err.message);
          return err;
        }
        return decoded;
      }
    ); // If there is an error decoded token would contain it

    //console.log(decodedToken.userId);

    if (decodedToken.name === 'TokenExpiredError') {
      authData.expired = true;
      return authData;
    }
  } catch (e) {
    authData.expired = true;
    return authData;
  }

  if (!decodedToken) {
    return authData;
  }

  authData.isAuth = true;
  authData.userId = decodedToken.userId;

  return authData;
};
