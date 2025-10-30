import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"
import { client } from '../config/db';

import 'dotenv/config';
import { CLIENT_URL } from '../globals';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_VERIFICATION_SECRET = process.env.EMAIL_VERIFICATION_SECRET;

export interface InterfaceCreateAccessToken {
  userId: string;
  email: string;
}

export const createAccessToken = (
  payload: InterfaceCreateAccessToken
): string => {
  return jwt.sign(
    {
      userId: payload.userId.toString(),
      email: payload.email,
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
  payload: InterfaceCreateRefreshToken,
): string => {
  return jwt.sign(
    {
      tokenVersion: payload.tokenVersion + 1,
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

export const emailVerificationToken = (
  email: string
): string => {
  return jwt.sign(
    {
      email: email,
    },
    EMAIL_VERIFICATION_SECRET as string,
    {
      expiresIn: 15 * 60,
    },
  )
};

export const revokeRefreshToken = async (userId: string) => {
  await client.userProfile.update({
    where: {
      userId: userId
    },
    data: {
      token: "",
    }
  });
}

export const sendVerificationEmail = async (email: string) => {

  const token = emailVerificationToken(email);

  if (!token) {
    throw new Error("Failed to Create token");
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER as string,
      pass: EMAIL_PASSWORD as string,
    },
  });

  const url = CLIENT_URL as string;
  const mailOptions = {
    from: `"TaskFlow Support" <${EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hi there,</p>
          <p>Thanks for signing up! Please verify your email address by clicking the link below:</p>
          <a href="${url}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>Or copy and paste this URL into your browser:</p>
          <p>${url}</p>
          <br>
          <p>— TaskFlow Team</p>
        </div>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
  }
  catch (e) {
    throw new Error("Failed to Send Email");
  }

  console.log(`Verification email sent to ${email}`);

};