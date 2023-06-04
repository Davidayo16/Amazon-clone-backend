import mongoose from "mongoose";
import  bcrypt  from 'bcryptjs';
import crypto from 'crypto'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true, "Please provide name"],
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        require:[true, "Please provide name"],
        // validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true
    },
    password:{
        type:String,
        minLength:[5, "Password is too short"],
        require:[true, 'Please provide password']
    },
    isAdmin:{
        type:String,
        require:true,
        default:false
    },
   
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }],
 
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date

},
{ timestamps: true }
)

userSchema.methods.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)

})

userSchema.methods.createPasswordResetToken=async function(){
    const resetToken=crypto.randomBytes(32).toString('hex')
    this.passwordResetToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
     this.passwordResetExpires=Date.now() + 30 * 60 * 1000
    return resetToken
}

const User=mongoose.model("User", userSchema)
export default User