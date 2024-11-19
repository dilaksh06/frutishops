import foodmodel from "../models/FoodModel.js";
import fs from 'fs';


// Add food items
const addFood = async (req, res) => {
    try {
        // Ensure both image and audio files are provided
        if (!req.files || !req.files.image || !req.files.audio) {
            return res.status(400).json({ success: false, message: "Both image and audio files are required" });
        }

        const image_filename = req.files.image[0].filename;
        const audio_filename = req.files.audio[0].filename;

        // Create a new food item from the request body, image, and audio filenames
        const food = new foodmodel({
            name: req.body.name,
            type: req.body.type,
            country: req.body.country,
            material: req.body.material,
            genre: req.body.genre,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            audio: audio_filename
        });

        // Save the food item to the database
        await food.save();

        // Respond with success if everything works
        res.status(201).json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        // Log the error for debugging
        console.error("Error adding food:", error);

        // Respond with a generic error message
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};


// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); // Corrected typo
    }
};



// Remove food items
const removeFood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Unlink (remove) the image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });

        // Delete the food item from the database
        await foodmodel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getsingleInstrument = async (req, res) => {
    try {
        // Extract the instrument ID from the request parameters
        const { id } = req.params;

        // Query the database to find the instrument by its ID
        const instrument = await foodmodel.findById(id);

        // If the instrument is not found, return a 404 response
        if (!instrument) {
            return res.status(404).json({ success: false, message: "Instrument not found" });
        }

        // Respond with the instrument details if found
        res.status(200).json({ success: true, data: instrument });
    } catch (error) {
        // Log the error for debugging
        console.error("Error retrieving instrument:", error);

        // Handle any errors (e.g., invalid ID format)
        res.status(500).json({ success: false, message: "Error retrieving instrument" });
    }
};





export { addFood, listFood, removeFood, getsingleInstrument };
