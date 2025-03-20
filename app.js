const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const ExpressError=require("./utils/ExpressError");
const wrapAsync=require("./utils/wrapAsync");
const listingSchema=require("./schema");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
const main=async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/practise");
}

main().then(()=>{
    console.log("connection made");
})
.catch((err)=>{
    console.log(err);
});

//Creating function for validation listing Schema
const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body.listing);
    if(error)
    {
        let errMsg=error.details.map((el)=>el.message).join();
        throw new ExpressError(400,errMsg);
    }
    else
    {
        next();
    }
}

//Home Route
app.get("/",(req,res)=>{
    res.send("Home Page");
});

//Index Route
app.get("/listings",wrapAsync(async(req,res)=>{
    let alllistings=await Listing.find({});
    res.render("listing/index",{alllistings});
}));

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listing/new");
});

// Create Route
app.post("/listings",validateListing,wrapAsync(async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");      
}));

//Show Route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    res.render("listing/show",{list});
}));

//Edit Route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    res.render("listing/edit",{list});
}));

//Update Route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    let{id}=req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

//Error handling middleware for all the pages that doesnot exists
app.all("*",(req,res,next)=>{
    next(new ExpressError(400,"Page doesnot Exists"));
});

//Error handling middleware
app.use((err,req,res,next)=>{
    let{status=500,message="Error Occurred"}=err;
})

app.listen(8080,()=>{
    console.log("server is listening to the port no 8080");
});





