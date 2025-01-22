import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     cartData:{type:Object,default:{}}
},{minimize:false}) // If you want to keep empty objects in the document, you can set minimize: false 


const UserModel = mongoose.models.UserModel || mongoose.model('UserModel',userSchema)

export default UserModel