import express from 'express'
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js';
import { addOrderItems, getMyOrders, getOrderById, getOrders,updateOrderToPaid,updateOrderToDelivered } from '../controllers/orderController.js';

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);




export default router;



