const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() => console.log("Connection Succesful"))
.catch((err) => console.log(err))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item:String,
    price:Number,
});

const customerSchema = new Schema ({
    name:String,
    orders:[
        {  
            type:Schema.Types.ObjectId,
            ref:"Order"
        },
    ],
});

const Order = mongoose.model("Order",orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

// const addCustomer = async() => {
//     let cust1 = new Customer({
//         name:"Rahul Kumar",
//     });
//     let order1 = await Order.findOne({item:"chips",price:10});
//     let order2 = await Order.findOne({item:"chocolate",price:40});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result);
// }

// addCustomer();

// const addOrders = async() => {
//     let res = await Order.insertMany([
//         {item:"samosa",price:12},
//         {item:"chips",price:10},
//         {item:"chocolate",price:40},
//     ]);
//     console.log(res);
// };

// addOrders();

const findCustomer = async() => {
    let result = await Customer.find({}.populate("orders"));
    console.log(result[0])
}

const addCust = async() => {
    let newCust = new Customer ({
        name:"karan Arjun"
    });

    let newOrder = new Order ({
        item:"pizza",
        price:250,
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new cusotmer");
};

    const delCust = async() =>{
        let data = await Customer.findByIdAndDelete("6715b6856132e3503a9cd7b3");
        console.log(data)
    };


// addCust();
delCust();