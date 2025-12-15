
import {Schema,model,Document} from "mongoose";


interface UsersI extends Document{
    name:string,
    email:string,
    password:string,
    role:"admin"|"student",
    attendance:Schema.Types.ObjectId,
    leave:Schema.Types.ObjectId,
}

const UserSchema=new Schema<UsersI>({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:["admin","present"],
        required:true,
    },
    attendance:{
        type:Schema.ObjectId,ref:'Attendance',
        required:true,
    },
    leave:{
   type:Schema.ObjectId,ref:'Leave'
    },
    

},{timestamps:true},);


const userModel= model<UsersI>("users",UserSchema);

export default userModel;