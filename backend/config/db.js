import mongoose from "mongoose";  // Corrected 'mogoose' to 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/MusicHub', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};
