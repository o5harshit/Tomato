import orderModel from "../Models/orderModel.js";
import UserModel from "../Models/UserModel.js";
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order form frontend
export const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5174";
    try{
        const newOrder = new orderModel({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address
        })
        console.log(req.body);
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data :{
                currency : "inr",
                product_data:{
                    name : item.name
                },
                unit_amount : item.price*100*80
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data : {
                currency : "inr",
                product_data : {
                    name : "Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity : 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode : "payment",
            success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success : true,session_url:session.url})
    } catch(err){
        res.json({success : false,message:err});
    }
}

export const verifyOrder = async(req,res) => {
    const {orderId,success} = req.body;
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{ payment : true});
            res.json({success : true,message : "Paid"})
        } else {
            await orderModel.findByIdAndDelete(orderId);
        }
    } catch{
        res.json({success : false,message : "Something Went Wrong"});
    }
}

//user orders for frontend

export const userOrders = async (req,res) => {
    try{
    const user = await orderModel.find({userId : req.body.userId});
    res.json({success : true,message : user});
    } catch(err){
        res.json({success : false,message : err});
    }
}


// Liting order for admin panel

export const listOrder = async(req,res) =>{
    try{
    const orderData = await orderModel.find({});
    res.json({success : true,message : orderData});
    }catch(err) {
        res.json({success : false,message : err});
    }
}

export const StatusOrder = async(req,res) => {
    try{
        const order = await orderModel.findByIdAndUpdate(req.body.id,{status : req.body.status});
        res.json({success : true,message:order});
    }  catch(err){
        res.json({success : false,message : err});
    }
}