import {Schema,model,Document} from "mongoose";


interface AttendanceI extends Document {
    user?:Schema.Types.ObjectId,
    status:"present"|"absent"|"late"|"excuse",
    date:Date,
}

const AttendanceSchema=new Schema<AttendanceI>({
    user:{
        type:Schema.ObjectId,
        ref:'Users',
        required:true,
    },
    status:{
        type:String,
        enum:["present","absent","late","excuse"],
        required: true,

    },
    date:{
        type:Date,
        required:true,
    },

},{timestamps:true},);

const AttendanceModel= model<AttendanceI>("Attendance",AttendanceSchema);
export default AttendanceModel;