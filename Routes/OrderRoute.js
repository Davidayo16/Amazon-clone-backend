import express from "express"
import asyncHandler from "express-async-handler"
import Order from './../Models/OrderModel.js';
import protect from './../Middleware/AuthMiddleware.js';


const orderRouter=express.Router()

// Create Orders
orderRouter.post("/", protect,asyncHandler(async(req, res)=>{
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod,  
        taxPrice,
        shippingPrice,  
        totalPrice,
        itemsPrice,
    }=req.body
  
    if(orderItems&& orderItems.length===0){
        res.status(400)
        throw new Error("No order items")
    }else{
        const order=new Order({
             orderItems,   
             shippingAddress, 
             user:req.user._id,
             paymentMethod,  
             taxPrice,
             shippingPrice,  
             totalPrice,
             itemsPrice,
        })
        const createdOrder=await order.save()
        console.log(createdOrder)
        res.status(200).json(createdOrder)
    }

}))


// Get Orders
orderRouter.get("/", protect,asyncHandler(async(req, res)=>{
    const order=await Order.find({user:req.user._id}).sort({id:-1})
          res.json(order)
  }))

  // Get specific order
orderRouter.get("/:id", protect,asyncHandler(async(req, res)=>{
  const order=await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
    if(order){
        res.json(order)
    }else{
        res.status(404)
     throw new Error("Order not found")
    }

}))

// Order payment
orderRouter.put("/:id/pay", protect,asyncHandler(async(req, res)=>{
    const order=await Order.findById(req.params.id)
    console.log(req.body.update_time, req.body.status)
      if(order){
          order.isPaid=true
          order.paidAt=Date.now()
          order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            // email_address:req.body.email_address
          }
          const updatedOrder=await order.save()
          res.json(updatedOrder)
      }else{
          res.status(404)
       throw new Error("Order not found")
      }
  
  }))
export default orderRouter