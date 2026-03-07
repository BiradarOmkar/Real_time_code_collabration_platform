import mongoose from "mongoose";

const interview_session=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    sessionCode:{
        type:String,
        required:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["scheduled","completed","cancelled","live"],
        default:"scheduled"
    },
    scheduledAt:Date,
    duration:Number,
},
{
    timestamps:true
})

const interview=mongoose.model("interview_session",interview_session);
export default interview;