const Course = require('../models/course')

// Create course
exports.create = async(req, res) => {
    const { title, description, startdate,enddate } = req.body
    try{
        await Bucket.create({ title, description, startdate,enddate })
        return res.json({status: 'ok', msg:"success"})
    }catch(e){
        return res.json({status: 'error', msg:"failed"})
    }
}


// Get all courses
exports.getCourses = async(req, res) => {
    try{
       const courses = await Course.find({})
        return res.json({status: 'ok', msg:"success", data: courses})
    }catch(e){
        return res.json({status: 'error', msg:"failed"})
    }
}


