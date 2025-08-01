import express from 'express';
const router = express.Router();
import { createProduct,updateProduct, deleteProduct, getProductById, getProducts, getTopProducts, createProductReview } from '../controllers/productController.js';

import { checkObjectId } from '../middleware/checkObjectId.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.route("/").get(getProducts).post(protect,admin,createProduct);

router.get("/top",getTopProducts);

router.route("/:id/reviews").post(protect,checkObjectId,createProductReview)

router.route("/:id")
.get(protect,admin,getProductById)
.put(protect,admin,updateProduct)
.delete(protect,admin,deleteProduct);





export default router;