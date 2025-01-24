const mongoose=require("mongoose");
const Listing=require("../models/listing");
const alldata=require("../init/data");

const main=async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/practise");
}

main().then(()=>{
    console.log("Successfully connected to the database");
})
.catch(()=>{
    console.log("Failed to connect to the database");
});

const initdata=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(alldata.data);
}
initdata().then(()=>{
    console.log("data inserted successfully in the database");
})
.catch((err)=>{
    console.log(err);
});