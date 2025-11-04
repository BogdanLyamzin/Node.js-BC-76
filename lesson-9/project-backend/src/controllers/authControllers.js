import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import createHttpError from 'http-errors';

import User from '../db/models/User.js';
import Session from '../db/models/Session.js';

import { createSession, setSessionCookies } from '../services/auth.services.js';

import sendEmail from "../services/sendEmail.js";

const {BASE_URL, JWT_SECRET} = process.env;

export const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(400, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1h"});

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/auth/verify?token=${token}" target="_blank">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

  res.status(201).json(newUser);
};

export const verifyEmailController = async(req, res)=> {
    const {token} = req.query;
    try {
        const {email} = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({email});
        if(!user) throw new Error("User not found");
        if(user.verify) throw new Error("User already verified");
        user.verify = true;
        await user.save();
        
        res.json({
            message: "Email verified"
        });
    }
    catch(error) {
        throw createHttpError(401, error.message);
    }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, 'User not found');

  if(!user.verify) throw createHttpError(401, 'Email not verified');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw createHttpError(401, 'Invalid credientials');

  await Session.findOneAndDelete({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.json(user);
};

export const refreshSessionController = async (req, res) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();
  if (isRefreshTokenExpired) throw createHttpError(401, 'Session expired');

  await Session.findByIdAndDelete(session._id);

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.json({
    message: 'Session refreshed',
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await Session.findByIdAndDelete(sessionId);
  }

  res.clearCookie('accessToken');
  res.clearCookie('acessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).json();
};
