const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlengths: 3
    },
    password: {
        type: String,
        required: true,
        minlengths: 6,
        trim: true
    },
    admin: {
        type: Boolean
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;