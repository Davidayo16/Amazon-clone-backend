import express from 'express';
import asyncHandler from "express-async-handler"

import protect from './../Middleware/AuthMiddleware.js';
import Blog from '../Models/BlogModel.js';

const blogRoute=express.Router()

// create blog
blogRoute.post('/', asyncHandler(async(req, res)=>{
    try {
        const newBlog=await Blog.create(req.body)
    res.json({
        status:'success',
        newBlog
    
    })
    } catch (error) {
        throw new Error(error)
    }

}))

// get blogs
blogRoute.get('/', asyncHandler(async(req, res)=>{
    try {
        const blogs=await Blog.find({})
        res.json(blogs)
    res.json({
        status:'success',
        newBlog
    
    })
    } catch (error) {
        throw new Error(error)
    }

}))

// get blog
blogRoute.get('/:id', asyncHandler(async(req, res)=>{
    try {
        const {id}=req.params
        const blog=await Blog.findById(id).populate('likes').populate('disLikes')
        const updateView=await Blog.findByIdAndUpdate(
            id,
            {
            $inc:{numViews:1}
        },
        {
            new:true
        }
        )

        res.json(blog)
    } catch (error) {
        throw new Error(error)
    }

}))


// update blogs
blogRoute.put('/:id', asyncHandler(async(req, res)=>{
    try {
        const {id}=req.params
        console.log(id)
        const updatedBlog=await Blog.findByIdAndUpdate(id, req.body,{
            new:true
        })
        res.json(updatedBlog)
  
    } catch (error) {
        throw new Error(error)
    }

}))
// update blogs
blogRoute.delete('/:id', asyncHandler(async(req, res)=>{
    try {
        const {id}=req.params
        console.log(id)
        const deleteBlog=await Blog.findByIdAndDelete(id)
        res.json('success')
  
    } catch (error) {
        throw new Error(error)
    }

}))

// Like blog
blogRoute.put('/like/:id', protect, asyncHandler(async(req, res)=>{
    try {
        const {id}=req.params
        const blog=await Blog.findById(id)
        const isLiked=blog?.isLiked
        const isDisliked=await blog.disLikes.find((dislike)=>dislike.toString()===req?.user?._id.toString())
        if(isDisliked){
            const blog=await Blog.findByIdAndUpdate(id, 
                {
                    $pull:{disLikes:req?.user?._id},
                    isDisliked:false,
                },
                {new:true}
                )
                res.json(blog)
            }if(isLiked){
                const blog=await Blog.findByIdAndUpdate(id, 
                    {
                        $pull:{likes:req?.user?._id},
                        isLiked:false
                    },
                    {new:true}
                    )
                    res.json(blog)
            }else{
                const blog=await Blog.findByIdAndUpdate(id, 
                    {
                        $push:{likes:req?.user?._id},
                        isLiked:true,
                    },
                    {new:true}
                    )
                    res.json(blog)
            }
  
    } catch (error) {
        throw new Error(error)
    }

}))

blogRoute.put('/dislike/:id', protect, asyncHandler(async(req, res)=>{
    try {
        const {id}=req.params
        const blog=await Blog.findById(id)
        const isDisliked=blog?.isDisliked
        const isLiked=await blog.likes.find((like)=>like.toString()===req?.user?._id.toString())
        if(isLiked){
            const blog=await Blog.findByIdAndUpdate(id, 
                {
                    $pull:{likes:req?.user?._id},
                    isLiked:false,
                },
                {new:true}
                )
                res.json(blog)
            }
        if(isDisliked){
            const blog=await Blog.findByIdAndUpdate(id, 
                    {
                        $pull:{disLikes:req?.user?._id},
                        isDisliked:false
                    },
                    {new:true}
                    )
                    res.json(blog)
            }else{
                const blog=await Blog.findByIdAndUpdate(id, 
                    {
                        $push:{disLikes:req?.user?._id},
                        isDisliked:true,
                    },
                    {new:true}
                    )
                    res.json(blog)
            }
  
    } catch (error) {
        throw new Error(error)
    }

}))






export default blogRoute