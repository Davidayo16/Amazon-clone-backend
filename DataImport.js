import asynHandler from "express-async-handler"
import express from "express"
import products from "./Data/Product.js"
import Products from "./Models/ProductModel.js"
import User from './Models/UserModel.js';
import users from './Data/user.js';


const importData=express.Router()

importData.post('/user', asynHandler(async (req,res)=>{
    await User.deleteMany({})
    const importUsers=await User.insertMany(users)
    res.send({importUsers})
})
)
importData.post('/product', asynHandler(async (req,res)=>{
    await Products.deleteMany({})
    const importProducts=await Products.insertMany(products)
    res.send({importProducts})
})
)
export default importData

