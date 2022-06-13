"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thought = void 0;
const mongoose_1 = require("mongoose");
const ReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => createdAtVal.toISOString()
    }
}, {
    toJSON: {
        getters: true
    }
});
const ThoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => createdAtVal.toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        ReactionSchema
    ]
}, {
    toJSON: {
        getters: true
    },
    id: false
});
exports.Thought = (0, mongoose_1.model)('Thought', ThoughtSchema);
