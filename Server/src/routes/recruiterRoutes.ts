import express from 'express';
import { recruiterController } from "../controllers/recruiterController";
import { jobController } from '../controllers/jobController';
import { upload } from '../config/multer';
import { authMiddleware } from '../middlewares/userAuth';


const router = express.Router();

router.post('/login',recruiterController.recruiterLogin)
router.post('/profile',upload.single('upload'),authMiddleware.verifyToken, authMiddleware.isVerified,recruiterController.createProfile)
router.post('/create-job',authMiddleware.verifyToken, authMiddleware.isVerified,jobController.createJob);
router.get('/home',authMiddleware.verifyToken,authMiddleware.isVerified,jobController.getAllJobsOfRecruiter);
router.get('/edit-job/:id',authMiddleware.verifyToken, authMiddleware.isVerified,jobController.getJobById)
router.post('/edit-job',authMiddleware.verifyToken, authMiddleware.isVerified,jobController.updateJob)


export default router;