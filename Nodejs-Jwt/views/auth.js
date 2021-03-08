const jwt=require('jsonwebtoken')
const requirepath=(req,res,next)=>{
const token=req.cookies.jwt
if(token)
{
	jwt.verify(token,'net ninja',(err,decodedtoken)=>{
		
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
module.exports={requirepath}