import { userRouter } from "./user-routes";
import { thoughtsRouter } from "./thought-routes";
import express  from "express";

export const routes = express.Router();
routes.use('/api/users', userRouter);
routes.use('/api/thoughts', thoughtsRouter);