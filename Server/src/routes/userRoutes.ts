import express from 'express';
import { userController } from '../controllers/userController';
import { upload } from '../config/multer';
import { authMiddleware } from '../middlewares/userAuth';
import { jobController } from '../controllers/jobController';


const router = express.Router();

router.post('/signup', userController.signup);
router.post('/verify-otp', userController.verifyOtp);
router.post('/resend-otp', userController.resendOtp);
router.post('/login',userController.userLogin)
router.post('/profile',upload.single('upload'),authMiddleware.verifyToken, authMiddleware.isVerified,userController.createProfile)
router.post('/forgot-password',userController.sendForgotOtp)
router.post('/verify-forget-password',userController.verifyForgetOtp)
router.post('/reset-password',userController.resetPassword);
router.get('/home', jobController.getAllJobs);
router.get('/apply-job/:id',jobController.getJobById)

export default router;
