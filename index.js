const express=require("express");
const connection=require("./config/db")
const {userRouter}=require("./routes/user.route")
const {productRouter}=require("./routes/product.route")
const {authenticate}=require("./middlewares/auth")
const app=express();
const cors=require("cors")
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/user",userRouter)
app.use(authenticate)
app.use("/products",productRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error.message)
    }
    console.log("sever is running at 8080")
})
