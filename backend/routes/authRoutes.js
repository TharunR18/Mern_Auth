import express from 'express'
import { login, logout, register } from '../controller/authController.js'

export const Router = express.Router()

Router.post('/register',register);
Router.post('/login',login);
Router.post('/logout',logout);

