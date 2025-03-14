const mongoose=require("mongoose");
const allData=require("../init/data");
const Listing=require("../models/listing");

const main=async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/practise");
}

main().then(()=>{
    console.log("successfully connected to the database");
})
.catch((err)=>{
console.log(err);
});

const initData=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(allData.data);
}

initData().then(()=>{
    console.log("data inserted successfully into the database");
})
.catch((err)=>{
    console.log(err);
});
