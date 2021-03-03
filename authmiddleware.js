const jwt=require('jsonwebtoken')
const requireauth=(req,res,next)=>{
    const token=req.cookies.jwt

if(token)
{
    jwt.verify(token, 'net ninja secret',(err,decodedtoken)=>{

if(err)
{
    console.log(err.message)
    res.redirect('/login')
}
else{
    console.log(decodedtoken)
    next()
}

    })
}
else{
    res.redirect('/login')
}

}
module.exports={requireauth}