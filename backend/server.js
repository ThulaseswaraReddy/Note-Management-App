const express = require("express");
const cors = require("cors");
require("./db");
require('dotenv').config()
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth",authRoutes);
app.use("/notes",noteRoutes);
app.listen(process.env.PORT,()=>{
    console.log("Server Running");
});

