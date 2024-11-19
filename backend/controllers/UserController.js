import userModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Create JWT Token with expiration
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Create a token for the user
        const token = createToken(user._id);

        // Send the token back to the user
        return res.json({ success: true, token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email and password format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Check if password is strong (length check)
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const user = await newUser.save();

        // Generate token
        const token = createToken(user._id);

        // Send token to the client
        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export { loginUser, registerUser };
