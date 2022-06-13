import { thoughtController } from "../../controllers/thought-controller";
import express from "express";
export const thoughtsRouter = express.Router();

thoughtsRouter.route("/")
.get(thoughtController.getThoughts)
.post(thoughtController.addThought);

thoughtsRouter.route("/:id")
.get(thoughtController.getThoughtById)
.put(thoughtController.updateThought)
.delete(thoughtController.deleteThought);

thoughtsRouter.route("/:id/reactions")
.put(thoughtController.addReaction);
thoughtsRouter.route("/:id/reactions/:reactionId")
.put(thoughtController.removeReaction);

