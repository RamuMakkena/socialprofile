"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
app.use(api_1.routes);
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Use this to log mongo queries being executed!
mongoose_1.default.set('debug', true);
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
