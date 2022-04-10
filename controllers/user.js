const User = require('../models/user')
const Course = require('../models/course')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





//signup

exports.signup = async (req, res) => {
    const { name, email, contact, password } = req.body
    // Hasing the password
    const Password = await bcrypt.hash(password, 10)

    try{
    const user = await User.create({
        password: Password,
        email,
        name,
        contact
    })
    return res.json({msg:"success"})
}catch(error) {
    // 11000 - error for duplicate key, model
    if(error.code === 11000 && error.errmsg.includes('email')){
        return res.json({status: 'error', msg: 'email already exists' })

    
    } else if(error.code === 11000 && error.errmsg.includes('contact')){
        return res.json({status: 'error', msg: 'phone Number already exists' })
    }

    throw error
}
}


//login

exports.login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).lean()
    if(!user){
        return res.json({status:'error', msg:"Invalid email/password"})
    }
   
    

    if(!await bcrypt.compare(password, user.password)){

        return res.json({status:'error', msg:"Invalid email/password"})
        
    }

    try{

        const token = jwt.sign({id:user._id,  email:user.email },process.env.JWT_SECRET,{expiresIn: '15d'} );
        

       
        
        const u = await User.findOneAndUpdate({email}, {$push: 
            { 
                tokens:[{
                    token:token
                }] 
            
            
            }
           
        
        
        }, {new: true})
      

        return res.json({status: 'OK', msg: "Loged in successfully" ,user:u})
        
 
        
        
        }catch(e){
            return res.json({status:'error'})
        }

}

//authenication


exports.auth =async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }
        req.token=token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

//view users list

exports.getUsers = async(req, res) => {
    try{
       const users = await User.find({})
        return res.json({status: 'ok', msg:"success", data: users})
    }catch(e){
        return res.json({status: 'error', msg:"failed"})
    }
}

//enroll in courses before startdate

exports.enroll = async(req,res) => {
    const { userid, courseid } = req.body
    const today = moment().format("YYYY-MM-DD")
    const course = Course.findOne({_id:courseid})

    try{
    if(course.startdate > today) {
        await User.findOneAndUpdate({_id:userid}, {$push: 
            { 
                courses:courseid
            
            
            }
        
        
        })
    }

    return res.json({status: 'ok', msg:"success"})
}catch(e){
    return res.json({status: 'error', msg:"failed"})
}
}

//view all enrolled courses

exports.allcourses = async(req,res) => {
    const { id } = req.body

    try{
        const courses = await User.findOne({ _id:id })
         return res.json({status: 'ok', msg:"success", data: courses.courses})
     }catch(e){
         return res.json({status: 'error', msg:"failed"})
     }

    
}