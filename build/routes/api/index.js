"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_routes_1 = require("./user-routes");
const thought_routes_1 = require("./thought-routes");
const express_1 = __importDefault(require("express"));
exports.routes = express_1.default.Router();
exports.routes.use('/api/users', user_routes_1.userRouter);
exports.routes.use('/api/thoughts', thought_routes_1.thoughtsRouter);
