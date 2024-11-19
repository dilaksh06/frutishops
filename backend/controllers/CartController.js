import userModel from "../models/UserModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData is initialized
        let cartData = userData.cartData || {};

        // Add or increment the item in the cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Respond with success
        res.status(200).json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



//remove items from user cart
// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);

        // Ensure cartData is initialized
        let cartData = userData.cartData || {};

        // Check if the item exists and its quantity is greater than 0
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the quantity becomes 0, remove the item from cartData
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Update the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Respond with success
        res.status(200).json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};


//fetchuser cart data
const getCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

export { addToCart, removeFromCart, getCart }