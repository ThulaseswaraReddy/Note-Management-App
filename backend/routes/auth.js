const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require('dotenv').config()
router.post("/register", async(req,res)=>{
    try{
    const {name,email,password} = req.body;
    const exist = await User.findOne({email});
    if(exist){
        return res.status(400).json({msg:"Email already exists"});
    }
    const hash = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hash
    })
    return  res.status(201).json({msg:"User Created Successfully"});
}
catch(error){
    return res.send("server error :"+error)
}
});

router.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    if (!email || !password) {
    return res.status(400).json({
        msg: "Please fill all fields"
    });
}
const user=await User.findOne({email})
if (!user) {
    return res.status(400).json({
        msg: "Invalid email"
    });
}
const match = await bcrypt.compare(password, user.password);
if (!match) {
    return res.status(400).json({
        msg: "Invalid password"
    });
}
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET
    );
    res.status(200).json({
    token,
    msg: "Login Successful"
});
});
module.exports = router;