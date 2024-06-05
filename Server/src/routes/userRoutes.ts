import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/verify-otp', userController.verifyOtp);
router.post('/resend-otp', userController.resendOtp);
router.post('/login',userController.userLogin)
router.post('/profile',userController.createProfile)

export default router;
