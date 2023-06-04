import mongoose from "mongoose";
const imageSchema=mongoose.Schema({
    img:{
        type:String,
        require:true
    },
  
    
}
)

const reviewSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true,
    },
    comment:{
        type:String,
        require:true,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },  
    
},{ timestamps: true }
)

const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:[imageSchema],
    description:{
        type:String,
        require:true
    },
    isWishlist:{
        type:Boolean,
        default:false,
   
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    isBest:{
        type:Boolean,
        default:false
    },
    brand:{
        type:String,
        require:true
    },
    reviews:[reviewSchema],
    properties:[{
       
    }],
    rating:{
        type:Number,
        require:true,
        default:0,
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Category'
    }], 
  
    numReviews:{
        type:Number,
        require:true,
        default:0,
    },
    price:{
        type:Number,
        require:true,
        default:0,
    },
    countInStock:{
        type:Number,
        require:true,
        default:0,
    },
},
{ timestamps: true }
)

const Products=mongoose.model("Products", productSchema)
export default Products