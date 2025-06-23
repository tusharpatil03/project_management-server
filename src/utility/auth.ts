import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../globals';
import 'dotenv/config'
import { client } from '../db';

export interface InterfaceCreateAccessToken {
  userId: string;
  email: string;
  username: string;
}

export const createAccessToken = (
  payload: InterfaceCreateAccessToken
): string => {
  return jwt.sign(
    {
      userId: payload.userId.toString(),
      email: payload.email,
      username: payload.username,
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 24 * 60 * 60,
    }
  );
};

export interface InterfaceCreateRefreshToken {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  tokenVersion: number;
}

export const createRefreshToken = (
  payload: InterfaceCreateRefreshToken
): string => {
  return jwt.sign(
    {
      tokenVersion: payload.tokenVersion,
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    },
    REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "30d",
    },
  )
};

export const revokeRefreshToken = async (userId: string) => {
  const userProfiel = await client.userProfile.update({
    where: {
      userId: userId
    },
    data: {
      token: "",
    }
  });


}


const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;


export const sendVerificationEmail = (token: string, email: string) => {

  const mailTransporter =
    nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: EMAIL_USER as string,
          pass: EMAIL_PASSWORD as string
        }
      }
    );

  const url = `https://localhost:8080/auth/verify?token=${token}`

  const mailDetails = {
    from: EMAIL_USER as string,
    to: email,
    subject: 'Verifiaction Email',
    text: url
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      throw new Error("Unable to send mail")
    }
  })

}