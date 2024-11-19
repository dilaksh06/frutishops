import mongoose from 'mongoose';  // Corrected import

// Corrected typo in orderScehma to orderSchema
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },  // Removed parentheses to pass the Date function itself
    payment: { type: Boolean, default: false }
});

// Corrected model creation and ensured no re-declaration
const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default OrderModel;
