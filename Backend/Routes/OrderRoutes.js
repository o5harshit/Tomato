import { listOrder, placeOrder, StatusOrder, userOrders, verifyOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";
import express from "express";

const OrderRouter = express.Router();


OrderRouter.post("/place",authMiddleware,placeOrder);
OrderRouter.post("/verify",verifyOrder);
OrderRouter.post("/userorders",authMiddleware,userOrders);
OrderRouter.get("/list",listOrder);
OrderRouter.post("/status",StatusOrder)
export default OrderRouter