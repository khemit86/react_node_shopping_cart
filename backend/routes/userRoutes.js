import express from 'express';
import { authUser, registerUser,logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, upateUser,deleteUser } from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post("/auth", authUser)
router.post("/logout", logoutUser)

router.route('/profile').get(protect,getUserProfile).post(protect,updateUserProfile)


router.route("/").post(registerUser).get(protect,admin,getUsers);
router.route('/:id')
.delete(protect,admin,deleteUser)
.get(protect,admin,getUserById)
.put(protect,admin,upateUser)



export default router;
