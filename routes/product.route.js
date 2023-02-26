const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const productRouter=express.Router();
const {productmodel}=require("../models/product.model")

app.use(express.json());

productRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"hell",async(err,decoded)=>{
            if(decoded){
                const product= await productmodel.find({author:decoded.userid})
                res.send(product)
            }else{
                res.send({msg:"wrong token"})
            }
        })
    }else{
        res.send("Please login first")
    }
})
productRouter.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        const newproduct= await productmodel(payloade);
        newproduct.save();
        res.send({msg:"new product created"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
productRouter.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await productmodel.findByIdAndUpdate(id,payloade)
        res.send({"msg":`product with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
productRouter.delete('/delete/:id',async(req,res)=>{
    const productId=req.params.id;
    await productmodel.findByIdAndDelete({_id:productId})
    res.send({"msg":`product with id:${productId} has been deleted`})
})


module.exports={
    productRouter
}