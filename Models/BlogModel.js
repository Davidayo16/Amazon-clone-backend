import mongoose from "mongoose";

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    introduction:{
        type:String,
        require:true,
    },
    section1:{
        type:String,
        require:true,
    },
    section2:{
        type:String,
        require:true,
    },
    section3:{
        type:String,
        require:true,
    },
    section4:{
        type:String,
        require:true,
    },
    section5:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true
    },
    numViews:{
        type:Number,
        default:0
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisliked:{
        type:Boolean,
        default:false
    },
   
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    disLikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    image:{
        type:String,
        require:true
    },
    Arthor:{
        type:String,
        default:'admin'
    },
 


},
{ timestamps: true }
)

const Blog=mongoose.model("Blog", blogSchema)
export default Blog