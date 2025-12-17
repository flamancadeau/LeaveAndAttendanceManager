
import {Schema,model,Document} from "mongoose";


interface LeaveI extends Document {
    user?:Schema.Types.ObjectId,
    status:"Approved"|"Denied"|"pending",
    reason:string,
    Startdate:Date,
    Enddate:Date,
    file?:string,
    }


const LeaveSchema= new Schema<LeaveI>({
user:{
    type:Schema.ObjectId,ref:'Users',
    required:true,
},
status:{
    type:String,
    enum:["Approved","Denied","pending"],
    required:true,
    default:"pending",
},
Startdate:{
    type:Date,
    require:true,
},
 Enddate:{
type:Date,
required:true
 },
 reason:{
    type:String,
    required:true

 },
 file:{
 type:String
 },
},{timestamps:true},
);

const LeaveModel= model<LeaveI>("Leave",LeaveSchema);
export default LeaveModel;
