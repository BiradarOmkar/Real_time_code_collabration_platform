import express from 'express'
import {verify_token} from '../middleware/AuthMiddleware.js';
import { authorize } from '../middleware/AuthMiddleware.js';
import { Schedule_interview } from '../controllers/InterviewerControllers.js';
import { get_Interview_sessions } from '../controllers/InterviewerControllers.js';
import { updateInterviewStatus } from '../controllers/InterviewerControllers.js';
const router=express.Router();

// only interviewer can access
router.post("/interviewer",verify_token,authorize("interviewer"),(req,res)=>{
    return res.status(200).json({message:"Interviewer route"})
})
// schedule interview 
router.post("/schedule-interview",verify_token,authorize("interviewer"),Schedule_interview);
// update interview status
router.patch("/interview/:id/status",verify_token,authorize("interviewer"),updateInterviewStatus)


// only candidate can access
router.post("/candidate",verify_token,authorize("candidate"),(req,res)=>{
    return res.status(200).json({message:"candidate route"})
})

// both can access
router.get("/interviews",verify_token,authorize("interviewer","candidate"),get_Interview_sessions);

// get user details from token
router.get("/me", verify_token, (req, res) => {
  res.json(req.user);
});
export default router;