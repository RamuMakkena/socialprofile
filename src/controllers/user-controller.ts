import { Request, Response } from "express";
import { Thought } from "../models/Thought";
import { User } from "../models/User";

export const userController = {
    //method to retrieve all users
    getAllUsers(req : Request, res : Response){
        User.find({})
        .then(dbUsers => res.json(dbUsers))        
        .catch( err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    //get user by their id
    getUserById(req: Request  , res : Response){
        // Need to incorporate thoughts & friends data
        console.log("user id : "+ req.params.id);
        User.findById({_id: req.params.id})
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
            console.log("db user data is "+dbUserData);
            if(!dbUserData){
                res.status(404).json({
                    message : "User not found with give ID"
                    });
                return;
            }
            res.json(dbUserData)

        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //Create User
    createNewuser(req : Request, res : Response){
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //Updating User
    updateUser(req : Request, res : Response){
        User.findOneAndUpdate({_id : req.params.id}, req.body, { new:true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch( err => res.status(400).json(err));
    },
    //delete user
    deleteUser(req : Request , res : Response){
        User.findOneAndDelete({_id: req.params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message : "No User found with given id"
                });
                return;
            }
            Thought.deleteMany({username: dbUserData.username})
            .then(dbThoughtsData => {
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));

            
        })
        
        .catch(err => res.status(400).json(err));
    },

    //Adding a friend to user
    addFriend(req : Request, res: Response){
        console.log("we came here to ass a friend");
        User.findOneAndUpdate({_id : req.params.id},{ $push: {friends:  req.params.friendId} }, { new:true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch( err => res.status(400).json(err));
    },

    //Delete a friend from user
    deleteFriend(req : Request, res: Response){
        User.findOneAndUpdate({_id : req.params.id},{ $pull: {friends: req.params.friendId} }, { new:true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({
                    message: "No user found to udpate with given id"
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch( err => res.status(400).json(err));
    }
}