import {Schema,model,Document} from "mongoose";


interface UsersI extends Document{
    name:string,
    email:string,
    password:string,
    role:"admin"|"student"|"teacher",
    attendance?: string,
    leave?: string,
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
        enum:["admin","student","teacher"],
        required:true,
        default: "student",
    },
    attendance:{
        type:String,
        required:false,
        default: "",
    },
    leave:{
        type:String,
        required:false,
        default: ""
    },
    password:{
        type:String,
        required:true,

    }
    

},{timestamps:true},);


const userModel= model<UsersI>("User",UserSchema);

export default userModel;