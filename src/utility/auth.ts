import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"
import { ACCESS_TOKEN_SECRET, EMAIL_VERIFICATION_SECRET, REFRESH_TOKEN_SECRET } from '../globals';
import 'dotenv/config'
import { client } from '../db';

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


const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;


export const sendVerificationEmail = async (token: string, email: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER as string,
        pass: EMAIL_PASSWORD as string,
      },
    });

    const url = `http://localhost:5173/signup/verify?token=${token}`;

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

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.error('Email send error:', err);
    throw new Error('Unable to send verification email');
  }
};