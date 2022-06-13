import express from "express";
import { userController } from "../../controllers/user-controller";
export const userRouter = express.Router();

userRouter.route('/')
.get(userController.getAllUsers)
.post(userController.createNewuser);

userRouter.route('/:id')
.get(userController.getUserById)
.put(userController.updateUser)
.delete(userController.deleteUser);

userRouter.route('/:id/friends/:friendId')
.post(userController.addFriend)
.delete(userController.deleteFriend);



