const express=require('express')
const createHttpError = require('http-errors')
const router=express.Router()
const User=require('./db')
const auth=require('./controllers/authcontroller')
//const { authschema } = require('./schema')
/*
router.post('/register',async(req,res,next)=>{
if(!email||!password)throw createHttpError.BadRequest()
const {email,password}=req.body
const result=await authschema.validateAsync(req.body)

const exist=await User.findOne({email:email})
if(exist)
{
    throw createHttpError.Conflict('email already registered')
}
const user=new User({email,password})
const saveduser=await user.save()
console.log(result)

})
*/
router.get('/signup',auth.signup_get)

router.post('/signup',auth.signup_post)

router.get('/login',auth.login_get)

router.post('/login',auth.login_post)

//router.get('/',auth.home)

//router.get('/getcookie',auth.getcookie)

//router.get('/readcookie',auth.readcookie)


module.exports=router