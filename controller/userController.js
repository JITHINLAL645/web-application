const userSchema = require('../model/userModel')
const bcrypt = require('bcrypt')
const saltround = 10;

const loadRegister = (req,res)=>{
    res.render('user/register')
}

const registerUser =async(req,res)=>{
    try {
       const {email,password}=req.body
       const user = await userSchema.findOne({email})
       if(user)return res.render('user/register',{message:'user already exists'})
        const hashedPassword = await bcrypt.hash(password,saltround)
        const newUser = new userSchema({
    email,
    password:hashedPassword
    }) 
    await newUser.save()
    req.session.message = "user created sucessfully"
    res.redirect('/user/login')
    //res.render('user/login',{message:"user created sucessfully"})
    } catch (error) {
       res.render('user/register',{message:"something went wrong"}) 
    }
}

const loadLogin = (req,res)=>{
    
    res.render('user/login',{message: req.session.message})
    req.session.message=null
}

const login =async(req,res)=>{
    try {
       const {email,password}=req.body
       const user = await userSchema.findOne({email})

       if(!user)return res.render('user/login',{message:'user doesnot exists'})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)return res.render('user/login',{message:'Incorrect password'})
        req.session.user = true
    
    res.redirect('/user/home')//,{message:"logged in sucessfull"}
    } catch (error) {
        res.render('user/login',{message:"something went wrong"}) 
    }
}
const loadHome = (req,res)=>{
    res.render('user/home')
}

const logout = async(req,res)=>{
    req.session.user = null
    res.redirect('/user/login')
}


 

module.exports={
    registerUser,
    loadLogin ,
    loadRegister,
    login,
    loadHome,
    logout
}