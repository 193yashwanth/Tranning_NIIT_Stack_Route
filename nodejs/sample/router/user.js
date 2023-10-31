import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
let user = []

router.get('/',(req,res)=>{
    res.send(user)
})
router.post('/',(req,res)=>{
    const data = req.body;
    user.push({ ...data, id: uuidv4() });
    res.send("added user")
})
router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    user = user.filter((user)=> user.id != id);
    res.send('deleted user')
})

export default router;