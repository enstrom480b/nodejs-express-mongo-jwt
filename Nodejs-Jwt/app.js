var express=require('express')
var app=express()
var jwt=require('jsonwebtoken')
var bodyParser=require('body-parser')
var User=require('./db.js');
var cookieParser=require('cookie-parser')
app.use(cookieParser())
var requirepath=require('./auth')
var checkuser=require('./auth')
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())
app.set('view engine','ejs')
const maxage=3*24*60*60*1000
const handleErrors=(err)=>{
	console.log(err.message,err.code)
	let errors={email:'',password:''}
	
	if(err.code===11000)
	{
		errors.email='That email is already registered'
		return errors
	}
	
	if(err.message.includes('User validation failed')){
		
		Object.values(err.errors).forEach(({properties})=>{
			errors[properties.path]=properties.message
		})
	}
	return errors
}
const createtoken=(id)=>{
	return jwt.sign({id},'eve secret',{
		expiresIn:maxage
	})
	
}

app.get('/register',function(req,res)
{
	res.render('register')
})

	
app.get('/login',function(req,res)
{
		res.render('login')
	
})
app.get('/home',function(req,res)
{
		res.render('homes')
	
})
app.get('/logout',function(req,res,next)
{
	res.cookie('jwt','',{maxage:1})
	
	res.redirect('/')
	
})

app.get('/',requirepath,checkuser,function(req,res,next)
{
		res.render('index')
	
})
app.post('/login',async function(req,res)
{



		const {email,password}=req.body
console.log(res.locals)
		try{
			const user=await User.login(email,password)
			const token=createtoken(user._id)
			res.cookie('jwt',token,{httpOnly:true,maxage:maxage})
			res.status(200).json({user:user._id})
			
		}catch(err)
		{
			res.status(400).json({})
		}
		//res.send('success')
	
})


app.post('/register',async function(req,res)
{
	const{email,password}=req.body
	try{
		const user=await User.create({email,password})
		const token=createtoken(user._id)
		res.cookie('jwt',token,{maxage:maxage})
		res.status(201).json({user:user._id})
	}catch(err){
	
		const errors=handleErrors(err)
		res.status(400).json({errors})
	}
	
})

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
	console.log('started')
})