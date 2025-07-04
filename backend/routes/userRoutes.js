import express from 'express';
import { authUser, registerUser,logoutUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleWare.js';

const router = express.Router();
router.route("/").post(registerUser).get(protect,admin,getUsers);
router.post("/auth", authUser)
router.post("/logout", logoutUser)

router.route('/profile').get(protect,getUserProfile).post(protect,updateUserProfile)



export default router;
