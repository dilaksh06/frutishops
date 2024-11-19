import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },            // Instrument name
    type: { type: String, required: true },            // Instrument type (e.g., String, Woodwind)
    country: { type: String, required: true },         // Country of origin
    material: { type: String, required: true },        // Materials used
    genre: { type: String, required: true },           // Musical genre (e.g., Classical, Jazz)
    description: { type: String, required: true },     // Description of the instrument
    price: { type: Number, required: true },           // Price of the instrument
    image: { type: String, required: true },           // Image URL or path
    audio: { type: String, required: true },           // Audio file URL or path
    category: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
