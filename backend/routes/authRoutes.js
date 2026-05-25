import express from 'express'
import { isAuthenticated, login, logout, register, sendVerifyOtp, verifyEmail, sendResetOtp, resetPassword } from '../controller/authController.js'
import { userAuth } from '../middleware/userAuth.js';

export const Router = express.Router()

Router.post('/register', register);
Router.post('/login', login);
Router.post('/logout', logout);
Router.post('/verify-otp', userAuth, sendVerifyOtp);
Router.post('/verify-account', userAuth, verifyEmail);
Router.post('/is-auth', userAuth, isAuthenticated);
Router.post('/send-reset-otp', sendResetOtp);
Router.post('/reset-password', resetPassword);

