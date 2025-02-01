import express from "express"
import { AddtoCart, deleteTocart, getCart } from "../controllers/CartController.js";
import { authMiddleware } from "../middleware/auth.js";

const CartRouter = express.Router();


CartRouter.post("/remove",authMiddleware,deleteTocart);
CartRouter.post("/Add",authMiddleware,AddtoCart);
CartRouter.get("/get",authMiddleware,getCart);

export default CartRouter;