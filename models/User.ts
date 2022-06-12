import {model, Schema} from "mongoose";

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
    },
    thoughts : [
        // Array of _id values referencing the Thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends : [
        // Array of _id values referencing the User model (self-reference)
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

},
{
  toJSON: {
    virtuals: true
  },
  id: false
});

//Virtual for getting list of fiends count
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});


export const User = model('User', UserSchema);
