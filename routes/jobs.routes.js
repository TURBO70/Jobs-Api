const express=require('express');

const router=express.Router();

const {createJob,getAllJobs,deleteJob,getJob,updateJob}=require('../controllers/job.controller');


router.post('/',createJob);
router.get('/',getAllJobs);
router.delete('/id',deleteJob);
router.get('/',getJob);
router.patch('/',updateJob);





module.exports=router;