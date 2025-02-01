import express from "express"
import { addFood, RemoveFooditem, seeFoodList } from "../controllers/foodController.js"

import multer from "multer"
import _default from "validator";


const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination : "Uploads",
    filename : (req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage:storage });

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",seeFoodList);
foodRouter.post("/remove",RemoveFooditem);

export default foodRouter;