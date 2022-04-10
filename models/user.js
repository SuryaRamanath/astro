const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    contact:{
        type: String
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
            }
        }
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSchema"
    }]
},{collection: 'user' , timestamp: true})

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model