"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thoughtController = void 0;
const Thought_1 = require("../models/Thought");
const User_1 = require("../models/User");
exports.thoughtController = {
    //adding a thought
    addThought(req, res) {
        Thought_1.Thought.create(req.body)
            .then(({ _id }) => {
            //Updating user based on username as username is unique
            return User_1.User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: _id } }, { new: true });
        })
            .then(dbUserData => {
            //returning user details
            if (!dbUserData) {
                res.status(404).json({ message: "user not found with given username" });
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => res.json(err));
    },
    //get thought by id
    getThoughtById(req, res) {
        Thought_1.Thought.findById({ _id: req.params.id })
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with given id" });
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get all thoughts
    getThoughts(req, res) {
        Thought_1.Thought.find({})
            .then(dbThoughts => {
            res.json(dbThoughts);
        })
            .catch(err => {
            res.status(400).json(err);
        });
    },
    //update a thought
    updateThought(req, res) {
        Thought_1.Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with given id" });
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => {
            res.status(400).json(err);
        });
    },
    // deleting a thought
    deleteThought(req, res) {
        Thought_1.Thought.findOneAndDelete({ _id: req.params.id })
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with given id" });
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => {
            res.status(400).json(err);
        });
    },
    //reaction: post delete
    addReaction(req, res) {
        console.log("reactions additions");
        Thought_1.Thought.findOneAndUpdate({ _id: req.params.id }, { $push: { reactions: req.body } }, { new: true })
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with given id" });
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //remove a reaction
    removeReaction(req, res) {
        Thought_1.Thought.findOneAndUpdate({ _id: req.params.id }, { $pull: { reactions: req.body } }, { new: true })
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with given id" });
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => {
            res.status(400).json(err);
        });
    }
};
