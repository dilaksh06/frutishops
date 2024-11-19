import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Added missing comma
    email: { type: String, required: true, unique: true }, // Added missing comma
    cartData: { type: Object, default: {} },
    password: { type: String, required: true }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;