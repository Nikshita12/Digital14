const mongoose = require ('mongoose');
// creating schema 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true 
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
