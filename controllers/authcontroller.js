const User=require('../db.js')
const cookie=require('cookie-parser')
const jwt=require('jsonwebtoken')
const maxage=3*24*60*60
const createtoken=(id)=>{

	return jwt.sign({id},'net ninja secret'),{
        expiresIn:maxage
    }
}
const handleErrors=(err)=>{
console.log(err.message,err.code)
let errors={email:'',password:''}
if(err.code===11000){
    errors.email='that email is already taken'
    return errors
}
if(err.message.includes('user validation failed')){
Object.values(err.erros).forEach(({properties})=>{
errors[properties.path]=properties.message
})
}
return errors
}

module.exports.signup_get= (req,res)=>{
    res.render('signup')
}
module.exports.signup_post=async(req,res)=>{
    const {email,password}=req.body
    try{
const user= await User.create({email,password})
const token=createtoken(user._id)
console.log(token)
res.cookie('jwt',token,{httpOnly:true,maxage:maxage*1000})
res.status(201).json({user:user._id})
    }
            catch(err)
{
const errors=handleErrors(err)
res.status(400).json({errros})
    }
}
/*
module.exports.getcookie=(req,res)=>{
    res.cookie('newuser',false)
    res.cookie('twoway',{maxage:1000*60*24*24,httpOnly:true})
    res.send('u got cookies')
}
module.exports.readcookie=(req,res)=>{
    const readcookie=req.cookies
    console.log(readcookie)
    res.json(readcookie)
}

*/
module.exports.login_get=(req,res)=>{
    res.render('login')
}
module.exports.login_post=async(req,res)=>{
const {email,password}=req.body
try{
   const user=await User.login(email,password) 
   res.status(200).json({user:user._id})

}catch(err)
{
       res.status(400).json({})
}
}
module.exports.home=(req,res)=>{
    res.render('home')
}
 

