var jwt=require('jsonwebtoken')
var cookieParser=require('cookie-parser')
const requirepath=(req,res,next)=>{
const token=req.cookies.jwt
if(token)
{
	jwt.verify(token,'eve secret',(err,decodedtoken)=>{
		
	if(err)
	{
		console.log(err.message)
		res.redirect('/login')
	}else{
		console.log(decodedtoken)
		next()
	}
	
	})
	
}
else{
	
	res.redirect('/login')
}
}
const checkuser=(req,res,next)=>{
	const token=req.cookie.jwt
	if(token)
	{
	jwt.verify(token,'eve secret',async(err,decodedtoken)=>{
	if(err)
	{
	console.log(err.message)
	res.locals.user=null
	next()
	}
	else
	{
	console.log('decodedtoken')
	let user=await user.findById(decodedtoken.id)
	res.locals.user=user
	
	next()
	}
	})
	}else{
		res.locals.user=null
		next()
	}	
	}
module.exports=checkuser
module.exports=requirepath