var mongoose=require('mongoose')
var bcrypt=require('bcrypt')
//connect to the DB
mongoose.connect('mongodb://localhost:27017/userDB')
//mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
	console.log('connected')
})
.catch((err)=>{
	console.log(err)
})
/*
mongoose.connection.on('connected',()=>{

	console.log('mongoose conneceted to db')
})
const maxage=3*24*60*60

mongoose.connection.on('err',(err)=>{

	console.log(err.message)
})


mongoose.connection.on('disconnected',()=>{

	console.log('mongoose disconneceted to db')
})


process.on('SIGNNIT',async()=>{
	await mongoose.connection.close()
	process.exit(0)
})
*/
var userschema=new mongoose.Schema({
	email:{
		type:String,
		required:true,
		lowecase:true,
		unique:true
		////validate:[isEmail,'please enter a valid Email']
	},
	password:{
		type:String,
		required:true//,'please enter password'],
		
	}
})

userschema.pre('save',async function(next){
	const salt=await bcrypt.genSalt()
	this.password=await bcrypt.hash(this.password,salt)

	next()
})
userschema.statics.login=async function(email,password)
{
const user=await this.findOne({email})
if(user)
{
const auth=await bcrypt.compare(password,user.password)
if(auth)
{
	return user
}
throw Error('incorrect password')
}
throw Error('incorrect email')

}

var User=mongoose.model('users',userschema)
module.exports=User
// adding to the DB

/*
var george=new User({
	email:'Burnny',
	password:'johnason'
})

george.find({},function(err,cats)
	{
		if(err)
		{
			console.log(err)
		}
		else{
			console.log(cats)
			
		}
		
	})
// save your data after succesfull connection

george.save(function(err,data)
{
	if(err)
	{
		console.log('something went wrong')
	}
	else{
		console.log('data inserted',DataSessionList)
	}
	
})


	*/