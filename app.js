const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing");
const path=require("path");
const ejsMate=require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
const main=async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/practise");
}

main().then(()=>{
    console.log("connection made");
})
.catch((err)=>{
    console.log(err);
});

//Home Route
app.get("/",(req,res)=>{
    res.send("Home Page");
});

//Index Route
app.get("/listings",async(req,res)=>{
    let alllistings=await Listing.find({});
    res.render("listing/index",{alllistings});
})
app.listen(8080,()=>{
    console.log("server is listening to the port no 8080");
});

