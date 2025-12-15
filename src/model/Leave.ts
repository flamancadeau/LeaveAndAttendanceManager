
import {Schema,model,Document} from "mongoose";


interface LeaveI extends Document {
    user:Schema.Types.ObjectId,
    status:"Approved"|"Denied",
    reason:string,
    Startdate:Date,
    Enddate:Date
    }


const LeaveSchema= new Schema<LeaveI>({
user:{
    type:Schema.ObjectId,ref:'Users',
    required:true,
},
status:{
    type:String,
    enum:["Approved","Denied"],
    required:true,
},
Startdate:{
    type:Date,
    require:true,
},
 Enddate:{
type:Date,
required:true
 },
},{timestamps:true},
);

const LeaveModel= model<LeaveI>("leave",LeaveSchema);
export default LeaveModel;
