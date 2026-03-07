import express from "express";
import interview from "../models/Interview_Session_model.js";
import user_model from "../models/User_model.js";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";

export const Schedule_interview = async (req, res) => {
  try {
    const { title,time, duration, candidate_email,date} =
      req.body;
    if (
      title == null ||
      time == null ||
      duration == null ||
      candidate_email == null||
      date==null
    ) {
      return res.status(400).json({ message: "feilds are Empty" });
    }
    console.log(req.body);
    
    // assign session_id
    const session_id= uuidv4();
    //   extract interviewer id
    const created_by = req.user.id;
//  find candidate id using email

const candidate_id=await user_model.findOne({email:candidate_email,role:"candidate"})

    if(!candidate_id) return res.status(404).json({message:"Candidate is Not Registered"});

    const scheduledAt = new Date(`${date}T${time}`); // UTC

    console.log("scheduled",scheduledAt);
    const inteview_session = await interview.create({
      title,
      scheduledAt: scheduledAt,
      candidate: candidate_id._id,
      duration,
      createdBy: created_by,
      sessionCode: session_id,
    });
    console.log("Sucessfully scheduled Interview");
    return res.status(200).json({
      message: "Successfully created Interview Session",
      details: inteview_session,
    });
  } catch (e) {
      return res.status(500).json({message:"Server Error"})
  }
};

// get all interviews 
export const get_Interview_sessions=async(req,res)=>{
   try{
       let interviews
        if(req.user.role=="interviewer"){
                interviews=await interview.find({
                 createdBy:req.user.id
               }).populate("candidate","email user_name");
        }else if(req.user.role=="candidate"){
                 interviews=await interview.find({
                   candidate:req.user.id   
                });
        }else{
             return res.status(403).json({ message: "Unauthorized role" });
        }
        console.log("Successfully fetched all interview sessions");
        return res.status(200).json({
            message:"Successfully fetched Interview Sessions",
            success:true,
            length:interviews.length,
            data:interviews
        })
   }catch(e){
        console.log(e);
        return res.status(500).json("Server Error !!")
   }
}


// update interview status
export const updateInterviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
   
    // allowed statuses
    const allowedStatuses = [
      "scheduled",
      "ongoing",
      "completed",
      "cancelled"
    ];

    // validate status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    // find interview
    const interviews = await interview.findById(id);
 
    if (!interviews) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }
    // ensure only creator can update
    if (interviews.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this interview"
      });
    }

    // update
    interviews.status = status;
    await interviews.save();
    return res.status(200).json({
      success: true,
      message: "Interview status updated successfully",
      data: interviews
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};