import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    orderItems:[
        {
            name:{type:String, require:true},
            price:{type:Number, require:true},
            qty:{type:Number, require:true},
            image:[{
                img:{type:String, require:true}
        }],
            product:{
                type:mongoose.Schema.Types.ObjectId,
                require:true,
                ref:"Product",
            },
        },
    ],
    shippingAddress:{
        address:{
          street: {type:String, require:true},
          unit:{type:String, require:true}
        },
        city:{type:String, require:true},
        country:{type:String, require:true},
        name:{type:String, require:true},
        state:{type:String, require:true},

    },
    paymentMethod:{
        type:String,
        require:true,
        default:"Paypal",
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}
    },
    taxPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    shippingPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    totalPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    itemsPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    isPaid:{
        type:Boolean,
        require:true,
        default:false,
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Boolean,
        require:true,
        default:false,
    },
    deliveredAt:{
        type:Date,
    },
},
{
    timeStamp:true
}
)

const Order=mongoose.model("Order", orderSchema)
export default Order