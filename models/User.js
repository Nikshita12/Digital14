const mongoose = require ('mongoose');

// creating schema for the model, the schema is going to take in the object which we need
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true // no two people should be able to login by same id
    },

    password: {
        type: String,
        required: true
    },
// gravatar attaches a profile image to your email
    avatar: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
}); 
 module.exports = User = mongoose.model('user', UserSchema);