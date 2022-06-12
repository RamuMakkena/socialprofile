import {model, Schema, Types} from "mongoose";
import dateFormat, {masks} from "dateformat";
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody : {
        type: String,
        required: true,
        maxlength: 280
    },
    username : {
        type: String,
        required : true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
        get: (createdAtVal: Date) => dateFormat(createdAtVal, "dddd, mmmm dS, yyyy, h:MM:ss TT")
    }
},{
    toJSON:{
        getters: true
    }
});

const ThoughtSchema = new Schema({
    thoughtText : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt : {
        type: Date,
        default: Date.now,
        get: (createdAtVal: Date) => dateFormat(createdAtVal, "dddd, mmmm dS, yyyy, h:MM:ss TT")
    },
    username : {
        type: String,
        required: true
    },
    reaction : [
        ReactionSchema
    ]
},
{
  toJSON: {
    getters: true
  },
  id: false
});


export const Thought = model('Thought', ThoughtSchema);
