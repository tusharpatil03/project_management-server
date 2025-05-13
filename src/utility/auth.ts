import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../globals';

export interface InterfaceCreateAccessToken {
  userId: string;
  email: string;
  username: string
}

export const createAccessToken = (
  payload: InterfaceCreateAccessToken
): string => {
  return jwt.sign(
    {
      userId: payload.userId.toString(),
      email: payload.email,
      username: payload.username
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    }
  );
};

// export const createRefreshToken = (
//   user: InterfaceUser,
//   userProfile: InterfaceUserProfile,
// ): string => {
//   return user && userProfile ? jwt.sign(
//     {
//       tokenVersion: userProfile.tokenVersion,
//       userId: user.id.toString(),
//       firstName: userProfile.firstName,
//       lastName: userProfile.lastName,
//       email: user.email,
//     },
//     REFRESH_TOKEN_SECRET as string,
//     {
//       expiresIn: "30d",
//     },
//   ) : ""
// };
