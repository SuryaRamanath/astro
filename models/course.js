const mongoose = require('mongoose');
const validator = require('validator');

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    descripton:{
        type: String,
        required:true
    },
    startdate:{
        type: Date,
        required:true
    },
    enddate:{
        type: Date,
        required:true
    }
    
},{collection: 'course' , timestamp: true})

const model = mongoose.model('CourseSchema', CourseSchema)

module.exports = model