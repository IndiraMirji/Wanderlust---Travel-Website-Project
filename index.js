const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(error);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner:"671b22203a6819f1eb379eb2",
    }));
    // console.log("Modified Data with Owner:", initData.data);

    // const insertedData = await Listing.insertMany(initData.data);
    // console.log("Inserted Data:", insertedData);

    // console.log("Data was initialized");
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
    console.log(initData.data);
}

initDB();