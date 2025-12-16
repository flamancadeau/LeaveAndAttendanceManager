import mongoose, {Schema,model,Document, mongo, Mongoose} from "mongoose";


interface UsersI extends Document{
    name:string,
    email:string,
    password:string,
    role:"admin"|"student"|"teacher",
    attendance?: mongoose.Types.ObjectId[],
    leave?: mongoose.Types.ObjectId[],
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
    attendance:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Attendance"
    }],
    leave:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Leave",
        }
],
    password:{
        type:String,
        required:true,

    }
    

},{timestamps:true},);


const userModel= model<UsersI>("User",UserSchema);

export default userModel;