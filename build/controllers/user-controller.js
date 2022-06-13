"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const Thought_1 = require("../models/Thought");
const User_1 = require("../models/User");
exports.userController = {
    //method to retrieve all users
    getAllUsers(req, res) {
        User_1.User.find({})
            .then(dbUsers => res.json(dbUsers))
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get user by their id
    getUserById(req, res) {
        // Need to incorporate thoughts & friends data
        console.log("user id : " + req.params.id);
        User_1.User.findById({ _id: req.params.id })
            .populate({
            path: 'thoughts',
            select: '-_v'
        })
            .populate({
            path: 'friends',
            select: '-_v'
        })
            .select('-_v')
            .then(dbUserData => {
            console.log("db user data is " + dbUserData);
            if (!dbUserData) {
                res.status(404).json({
                    message: "User not found with give ID"
                });
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //Create User
    createNewuser(req, res) {
        User_1.User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    //Updating User
    updateUser(req, res) {
        User_1.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => res.status(400).json(err));
    },
    //delete user
    deleteUser(req, res) {
        User_1.User.findOneAndDelete({ _id: req.params.id })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: "No User found with given id"
                });
                return;
            }
            Thought_1.Thought.deleteMany({ username: dbUserData.username })
                .then(dbThoughtsData => {
                res.json(dbUserData);
            })
                .catch(err => res.status(400).json(err));
        })
            .catch(err => res.status(400).json(err));
    },
    //Adding a friend to user
    addFriend(req, res) {
        console.log("we came here to ass a friend");
        User_1.User.findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.params.friendId } }, { new: true })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => res.status(400).json(err));
    },
    //Delete a friend from user
    deleteFriend(req, res) {
        User_1.User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => res.status(400).json(err));
    }
};
