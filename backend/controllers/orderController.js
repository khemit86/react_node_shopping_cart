import Order from "../models/orderModels.js";

const addOrderItems = (req,res) =>{
   const { orderItems, shippingAddress, paymentMethod } = req.body;
    if(orderItems  && orderItems.length == 0){
        res.status(400);
        throw new Error('no order items')
    }




  
}
export { addOrderItems }