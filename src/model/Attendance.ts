import {Schema,model,Document} from "mongoose";


interface AttendanceI extends Document {
    user:Schema.Types.ObjectId,
    status:"present"|"absent",
    date:Date,
}

const AttendanceSchema=new Schema<AttendanceI>({
    user:{
        type:Schema.ObjectId,
        ref:'user',
        required:true,
    },
    status:{
        enum:["present","absent"],
        requiered:true,

    },
    date:{
        type:Date,
        required:true,
    },

},{timestamps:true},);

const AttendanceModel= model<AttendanceI>("Attendance");
export default AttendanceModel;