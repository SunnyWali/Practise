const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

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
app.get("/listing",async(req,res)=>{
    let allListing=await Listing.find({});
    res.render("listing/index",{allListing});
});

app.listen(8080,()=>{
    console.log("server is listening to the port no 8080");
});

