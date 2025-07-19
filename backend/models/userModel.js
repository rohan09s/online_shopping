const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})
module.exports=mongoose.model("users",userSchema)


// const mongoose= require('mongoose')

// const userSchema= new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     address:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:Number,
//         required:true        
//     },
//     answer:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:Number,
//         default:0  //If we don't provide role as 1, i.e. admin; the default role will be user, i.e. 0
//     },

// },{timestamps:true})
// module.exports=mongoose.model("users",userSchema)