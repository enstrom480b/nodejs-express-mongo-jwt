var express=require('express')
var path=require('path')
var session=require('express-session')
var expressvalidator=require('express-validator')
var bodyparser=require('body-parser')
const { nextTick } = require('process')
const cookieparser=require('cookie-parser')
//var Category=require('./models/category.js')
var app=express()
var morgan=require('morgan')
var createerr=require('http-errors')
require('dotenv').config()
//var pages=require('./routes/pages')
//var adminpages=require('./routes/admin_pages')
var User=require('./db.js')
var {requireauth}=require('./authmiddleware')
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())
//global variables
app.locals.errors=null;
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
//set public folder
app.use(express.static(path.join(__dirname,'public')))
var authroute=require('./auth.route.js')
app.get('/',function(req,res){
res.render('home')
})
app.get('/smoothies',requireauth,(req,res)=>res.render('smoothies'))
app.use(authroute)
app.use(express.json())

/*
app.use(async(req,res,next)=>{
	const error=new Error('not found')
	error.status=404
	next(error)
})
app.use((err,req,res,next)=>{
	res.status(err.status)
	res.send({
		error:{
		status:err.status,
		message:err.message
		}
	})
})

*/
var port=3000
app.listen(port,function(){
	console.log('server started on port'+port)
})

//express session middleware

//express validator middleware
/*
app.use(expressvalidator({
errorFormatter:function(param,msg,value){
var namespace=param.split('.'),
root=namespace.shift()
,formParam=root;
while(namespace.length){
formParam+='['+namespace.shift()+']';	
}	
return{
param:formParam,
msg:msg,
value:value
}
}	
}))



//express messages

app.use(require('connect-flash')())

app.use(function(req,res,next){
	res.locals.messages=require('express-messages')(req,res)
	next()
	})
app.use(function(req,res,next){
	
	res.locals.messages=require('express-messages')(req,res)
})
*/

//app.use('app.get()/admin/pages',)
