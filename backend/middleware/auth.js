import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.headers['token'] || req.header('Token'); // handle case insensitivity
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(500).json({ success: false, message: "Failed to authenticate token." });
    }
};

export default authMiddleware;
