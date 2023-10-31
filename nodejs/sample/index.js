import express from "express";
import bodyParser from "body-parser";
import userRouter from './router/user.js'
const app = express();
const PORT = 5000;

app.use(bodyParser.json())
app.use('/user',userRouter)

app.get('/',(req,res)=>res.send("hello, world"))

app.listen(PORT)