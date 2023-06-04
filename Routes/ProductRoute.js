import express from 'express';
import asyncHandler from "express-async-handler"
import Category from '../Models/CategoryModel.js';
import Products from './../Models/ProductModel.js';
import User from './../Models/UserModel.js';
import protect from './../Middleware/AuthMiddleware.js';

const productRoute=express.Router()

// Get all products
productRoute.get('/', asyncHandler(async (req, res) => {
   try {
     const queryObj = { ...req.query };
     const excludeFields = ['page', 'sort', 'limit', 'fields', 'keyword']; // Add 'search' to excludeFields
     excludeFields.forEach((el) => delete queryObj[el]);
     console.log(queryObj);
 
     // Add search query functionality
     if (req.query.keyword) {
       const searchField = req.query.keyword;
       queryObj.$or = [
         { name: { $regex: searchField, $options: 'i' } }, // Replace 'field1' with the appropriate field to search in
         { brand: { $regex: searchField, $options: 'i' } }, // Replace 'field2' with the appropriate field to search in
         // Add more fields to search in, if needed
       ];
     }
 
     // Create count query object
     let queryStr = JSON.stringify(queryObj);
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
     console.log(JSON.parse(queryStr));
     let query = Products.find(JSON.parse(queryStr)).populate('category');
 
     if (req.query.sort) {
       const sortBy = req.query.sort.split(',').join(' ');
       query = query.sort(sortBy);
     } else {
       query.sort('createdAt');
     }
 
     // Count documents
     const countQueryObj = JSON.parse(queryStr);
     const countQuery = { ...countQueryObj };
     const countDoc = await Products.countDocuments(countQuery);
 
     // Pagination
     const page = Number(req.query.page) || 1;
     const limit = 12;
     const skip = (page - 1) * limit;
     query = query.skip(skip).limit(limit);
     if (req.query.page) {
       if (skip >= countDoc) throw new Error('This page does not exist');
     }
 
     const products = await query;
     res.json({ products, page, pages: Math.ceil(countDoc / limit) });
   } catch (error) {
     throw new Error(error);
   }
 }));
 
// Featured Products
productRoute.get('/featured', asyncHandler(async(req, res)=>{
   try {
      const products=await Products.find({isFeatured:true})
      res.json(products)
   } catch (error) {
      throw new Error(error)
   }
  }))
//   Get related products
  productRoute.get('/related', async (req, res) => {
    try {
      const categoryId = req.query.catId;
      const relatedProducts = await Products.find({ category: categoryId }).populate('category');
      console.log(relatedProducts)
      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Best seller products
productRoute.get('/best', asyncHandler(async(req, res) => {
   try {
     const products = await Products.find({ isBest: true }).sort({ createdAt: 'desc' });
     res.json(products);
   } catch (error) {
     throw new Error(error);
   }
 }));

// Single products
  productRoute.get("/:id", asyncHandler(async(req, res)=>{
   const product=await Products.findById(req.params.id)
   if(product){
       res.json(product)
   }else{
      res.status(404)
      throw new Error('Product not found') 
   }
})
)

// wishlist
productRoute.put("/wishlist", protect, asyncHandler(async(req, res)=>{
   const{proId}=req.body
   const user=await User.findById(req.user._id)
   try {
      if(user){
         const alreadyAdded=user.wishlist.find((wish)=>wish.toString()===proId)
         if(alreadyAdded){
            const user=await User.findByIdAndUpdate(req.user._id, {
               $pull:{wishlist:proId},
               isWishlist:false
               
            },{new:true})
          
            res.json(user)
         }else{
            const user=await User.findByIdAndUpdate(req.user._id, {
               $push:{wishlist:proId},
               isWishlist:true
               
            },{new:true})
           
            res.json(user)
         }
      }else{
         throw new Error("User not found")
      }
      
   } catch (error) {
      throw new Error(error)
   }
})
)

// Product review
productRoute.post("/:id/review", protect,asyncHandler(async(req, res)=>{
   const{rating, comment}=req.body
   const product=await Products.findById(req.params.id)
  
   if(product){
       const alreadyReviewed=product.reviews.find((r)=> r.user?.toString() === req.user?._id.toString())
      if(alreadyReviewed){
       res.status(400)
       throw new Error("Product already reviewed")
      }
       const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id,
       }
       product.reviews.push(review)
       product.numReviews=product.reviews.length
       product.rating=
          product.reviews.reduce((acc, item)=>acc + item.rating, 0)/product.reviews.length 
       await product.save()
       res.status(201).json({message:"Product reviwed"})
   }else{
      res.status(404)
      throw new Error('Product not found') 
   }
})
)
export default productRoute
