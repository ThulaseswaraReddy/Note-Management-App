const express = require("express");
const jwt = require("jsonwebtoken");
const Note = require("../models/Note");
const router = express.Router();
require('dotenv').config()
router.post("/add", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                msg: "Title and Content are required"
            });
        }
        const note = await Note.create({
            title,
            content,
            userId: decoded.id
        });
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        });
    }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const notes = await Note.find({
      userId: decoded.id
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
});

router.put("/:id",async(req,res)=>{
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            msg: "Title and Content are required"
        });
    }
    const token = req.headers.authorization
    jwt.verify(token,process.env.JWT_SECRET);
    
    const note = await Note.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(note)
})

router.delete("/:id", async(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token,process.env.JWT_SECRET);
    await Note.findByIdAndDelete(req.params.id);
    res.json({
        msg:"Deleted"
    });
})
module.exports = router;
