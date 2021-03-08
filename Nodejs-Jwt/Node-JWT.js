var express=require('express')
var app=express()
var jwt=require('jsonwebtoken')
require('dotenv').config()

const user={
	name:'vibhor',
	age:45
}
app.get('/user',function(req,res)
{
	res.json(user)
})
var token={
		email:'a@gmail.com',
		pass:7
	}
	
app.get('/login',function(req,res)
{
	const value={
		email:'a@gmail.com',
		pass:'7'
	}
	var jwttoken=jwt.sign({value},process.env.ACCESS_TOKEN)
		console.log(jwttoken)
		res.send(jwttoken )
})
/*
app.get('/login',auth,function(req,res)
{
	const value={
		email:'a@gmail.com',
		pass:'7'
	}
	var jwttoken=jwt.sign({value},process.env.ACCESS_TOKEN)
		console.log(jwttoken)
		res.send(jwttoken )
})

function auth(req,res,next){
	if(token!==undefined)
	{
		jwt.verify(token,process.env.ACCESS_TOKEN,(err,verified)=>{
			if(err)
			{
				return res.status(400).send('Token not verified')
				req.user=verified
				next()
			}
			else{
				
				res.send(token)
			}
			
		})
		
	}
	else{
		return res.status(404).send('needs to login first')
	}
	
}
*/
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
	console.log('started')
})