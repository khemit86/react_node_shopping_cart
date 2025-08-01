import Order from "../models/orderModels.js";
import Product from "../models/productModels.js";
import { calcPrices  } from "../utils/calcPrices.js";
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

const addOrderItems = async(req,res) =>{
    console.log(req.body);
   const { orderItems, shippingAddress, paymentMethod } = req.body;
    if(orderItems  && orderItems.length == 0){
        res.status(400);
        throw new Error('no order items');
    }else{

        

        const itemsFromDB = await Product.find({_id:{$in: orderItems.map((x)=> x._id) }})

       const dbOrderItems = orderItems.map((itemFromClient)=>{
            const matchingItemFromDB =  itemsFromDB.find((itemFromDB)=>itemFromDB._id.toString() == itemFromClient._id.toString())

            return {
                ...itemFromClient,
                product:matchingItemFromDB._id,
                price:matchingItemFromDB.price,
                _id:undefined
            }
            //console.log(matchingItemFromDB);/
       });
       
       const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

       const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,

       })

      
       const createOrder = await order.save();
       res.json(createOrder);

    }




  
}

const updateOrderToPaid = async (req,res)=>{

    /*
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error('Payment not verified');
    
   const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error('Transaction has been used before');
    */
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);

       
    }else{
        res.status(400)
        throw new Error('Order not found')
    }
    
}


const updateOrderToDelivered = async(req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);

       
    }else{
        res.status(400)
        throw new Error('Order not found')
    }
}

const getMyOrders = async(req,res) =>{
    
   const getMyOrders =  await Order.find({user:req.user._id});
   res.status(201);
   res.json(getMyOrders);

}

const getOrderById  = async(req,res) => {
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.json(order);
    }else{
        res.status(400);
        throw new Error(`Order not found for {req.params.id} `)
    }
    //console.log('order_detail')
}

//for admin
const getOrders = async (req,res) =>{
    const orders = await Order.find({}).populate('user','name email');
    res.json(orders);


}

export { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid,updateOrderToDelivered }