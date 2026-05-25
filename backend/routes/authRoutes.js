import express from 'express'
import { login, logout, register, sendVerifyOtp, verifyEmail } from '../controller/authController.js'
import { userAuth } from '../middleware/userAuth.js';

export const Router = express.Router()

Router.post('/register',register);
Router.post('/login',login);
Router.post('/logout',logout);
Router.post('/verify-otp',userAuth,sendVerifyOtp);
Router.post('/verify-account',userAuth,verifyEmail);

