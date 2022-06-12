import { response } from "express";
import { User } from "../models/User";

export const userController = {
    //method to retrieve all users
    getAllUsers(req, res : response){
        User.find({})
        .then(dbUsers => res.json(dbUsers))        
        .catch( err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    //get user by their id
    getUserById({params}, res : response){
        // Need to incorporate thoughts & friends data
        User.findById({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .populate({
            path: 'users',
            select: '-_v'

        })
        .select('-_v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message : "User not found with give ID"
                    });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //Create User
    createNewuser({body}, res : response){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //Updating User
    updateUser({params, body}, res : response){
        User.findOneAndUpdate({_id : params.id}, body, { new:true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
        })
        .catch( err => res.status(400).json(err));
    },
    //delete user
    deleteUser({params}, res : response){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message : "No User found with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Adding a friend to user
    addFriend({params}, res: response){
        User.findOneAndUpdate({_id : params.userId},{ $push: {friends: params.friendId} }, { new:true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
        })
        .catch( err => res.status(400).json(err));
    },

    //Delete a friend from user
    deleteFriend({params}, res: response){
        User.findOneAndUpdate({_id : params.userId},{ $pull: {friends: params.friendId} }, { new:true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
        })
        .catch( err => res.status(400).json(err));
    }
}