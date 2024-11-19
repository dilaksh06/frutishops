import express from "express";
import { addFood, listFood, removeFood, getsingleInstrument } from "../controllers/FoodControllder.js";
import multer from "multer";
const fooRouter = express.Router();

// Image and Audio Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Accept both image and audio files
fooRouter.post("/add", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 }
]), addFood);

fooRouter.get("/list", listFood);
fooRouter.post("/remove", removeFood);
fooRouter.get('/:id', getsingleInstrument);

export default fooRouter;
