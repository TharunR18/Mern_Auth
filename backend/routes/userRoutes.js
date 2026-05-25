import express from 'express';
import { getUserDetails } from '../controller/userController.js';
import { userAuth } from '../middleware/userAuth.js';

export const userRouter = express.Router();

userRouter.get('/get-user-details', userAuth, getUserDetails);
