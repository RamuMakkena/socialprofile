"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thoughtsRouter = void 0;
const thought_controller_1 = require("../controllers/thought-controller");
const express_1 = __importDefault(require("express"));
exports.thoughtsRouter = express_1.default.Router();
exports.thoughtsRouter.route("/")
    .get(thought_controller_1.thoughtController.getThoughts)
    .post(thought_controller_1.thoughtController.addThought);
exports.thoughtsRouter.route("/:id")
    .get(thought_controller_1.thoughtController.getThoughtById)
    .put(thought_controller_1.thoughtController.updateThought)
    .delete(thought_controller_1.thoughtController.deleteThought);
exports.thoughtsRouter.route("/reactions")
    .post(thought_controller_1.thoughtController.addReaction);
exports.thoughtsRouter.route("/:reactionId")
    .delete(thought_controller_1.thoughtController.removeReaction);
