import OrderModel from '../models/orderModel.js';

import userModel from "../models/UserModel.js"
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frondend_url = "http://localhost:5173/";
//palcing user order for frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity, // Directly inside the line item object
        }));

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 2 * 100 * 80, // Delivery fee in cents
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frondend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frondend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({ suucess: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true });
            res.josn({ success: true, message: "paid" })

        } else {
            await OrderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" })
        }
    } catch (error) {
        console.log(error);
        red.json({ success: false, message: "Error" })

    }
}

//user prders for front end
const userOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// listing orders for admin pannerls
const listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });

    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { updateStatus, listOrders, placeOrder, verifyOrder, userOrder };