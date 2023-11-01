const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const UserModels = require('./models/Users')

const app= express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/cgidb").then(()=>
    console.log("DB connected")
)

app.get('/', (req,res)=>{
    UserModels.find({})
    .then((users)=> res.json(users))
    .catch((err) => res.json(err))
})

app.post('/userdata', async(req,res)=>{
    const {name,age} = req.body;
    const newUser = new UserModels({name,age})
    await newUser.save()
    console.log({name,age});
    res.json(newUser)

})

app.listen(3001)