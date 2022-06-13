import { thoughtController } from "../controllers/thought-controller";
import express from "express";
export const thoughtsRouter = express.Router();

thoughtsRouter.route("/")
.get(thoughtController.getThoughts)
.post(thoughtController.addThought);

thoughtsRouter.route("/:id")
.get(thoughtController.getThoughtById)
.put(thoughtController.updateThought)
.delete(thoughtController.deleteThought);

thoughtsRouter.route("/reactions")
.post(thoughtController.addReaction);
thoughtsRouter.route("/:reactionId")
.delete(thoughtController.removeReaction);

