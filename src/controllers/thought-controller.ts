import { Request, request, Response } from "express";
import { response } from "express";
import { Thought } from "../models/Thought";
import { User } from "../models/User";



export const thoughtController ={
    //adding a thought
    addThought(req : Request, res: Response){
        Thought.create(req.body)
        .then( ({_id}) => {
            //Updating user based on username as username is unique
            return User.findOneAndUpdate({username: req.body.username},
                {$push:{thoughts: _id}},
                {new: true});
        })
        .then( dbUserData => {
            //returning user details
            if(!dbUserData){
                res.status(404).json({message: "user not found with given username"});
                return;
            }
            res.json(dbUserData)
        } )
        .catch(err => res.json(err));
    },
    
    //get thought by id
    getThoughtById(req : Request, res : Response){
        Thought.findById({_id : req.params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: "No thought found with given id"});
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
    getThoughts(req : Request, res : Response  ){
        Thought.find({})
        .then(dbThoughts => {
            res.json(dbThoughts)
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    //update a thought

    updateThought(req : Request, res: Response){
        
            Thought.findOneAndUpdate({_id : req.params.id}, req.body, {new: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message : "No thought found with given id"})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // deleting a thought
    deleteThought(req : Request, res: Response){
        Thought.findOneAndDelete({_id : req.params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message : "No thought found with given id"})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    //reaction: post delete

    addReaction(req : Request, res : Response){
        console.log("reactions additions");
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            { $push : {reactions: req.body} },
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message : "No thought found with given id"})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //remove a reaction

    removeReaction(req : Request, res : Response){
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            { $pull : {reactions: req.body} },
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message : "No thought found with given id"})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    }
}