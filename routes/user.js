const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

router.get('/',auth.isLogin,userController.loadRegister)
router.get('/register',auth.isLogin,userController.loadRegister)
router.post('/register',userController.registerUser)


router.get('/login',auth.isLogin,userController.loadLogin)
router.post('/login',userController.login)



router.get('/home',auth.checkSession,userController.loadHome)
router.get('/logout',auth.checkSession,userController.logout)


module.exports=router

// router.get('/login',(req,res)=>{
//     res.render('./user/login')
// })
// router.get('/register',(req,res)=>{
//     res.render('./user/register')
//     })

    // router.post('/register',(req,res)=>{
    //     console.log(req.body);
    //     res.json(req.body);
    // })use this first when u study