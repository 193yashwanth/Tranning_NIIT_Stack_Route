const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const UserModels = require('./models/Users')

const app= express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/cgidb");

app.get('/', (req,res)=>{
    UserModels.find({})
    .then((users)=> res.json(users))
    .catch((err) => res.json(err))
})

app.post('/post', async(req,res)=>{
    const user = req.body;
    const newUser = new UserModels(user)
    await newUser.save()
    console.log(user);
    res.json(user)

})

app.listen(3001)