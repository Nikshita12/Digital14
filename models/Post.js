const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({ 

    // we want post to be connected to user so can user csan themselves manage their posts, so
    // we will give the refrence to the user
user:{
    type: Schema.Types.ObjectId,
    ref: 'users'
},
text: {
    type: String,
    require: true
},
name: {              //name is of user not post as even if user deletes their account, and i want not to delete the post, nad want the name to be visible with their avatar
    type: String
},
avatar: {
    type: String
},

likes: [
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users' // this way we'll be able to see the like is from which user
        }
    }
],

comments:  [
    {
        
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users' 
        },
        text: {
            type: String,
            required: true
        },
        name: {              //name is of user not post as even if user deletes their account, and i want not to delete the post, nad want the name to be visible with their avatar
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        } 
    }],

    date: {
        type: Date,
        default: Date.now
    } 
})
module.exports = Post = mongoose.model('post', PostSchema); 