var mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const {isEmail}=require('validator')
mongoose.connect('mongodb://localhost/userMd',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
	console.log('connected')
})
.catch((err)=>{
	console.log(err)
})
var userschema=new mongoose.Schema({
	email:{
		type:String,
		required:[true,'Email is required'],
		unique:true,
		lowercase:true,
		validate:[isEmail,'please enter a valid email']
		
	},
	password:{
		type:String,
		required:[true,'please enter password'],
		minlength:[6,'Minimum password length is 6 characters']
	}
})

userschema.pre('save',async function(next){
	const salt=await bcrypt.genSalt()
	this.password=await bcrypt.hash(this.password,salt)
	next()
})
userschema.statics.login=async function(email,password){
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


userschema.post('save',function(doc,next){
	console.log('new user was created and saved',doc)
next()
})
const User=mongoose.model('user',userschema)
module.exports=User
