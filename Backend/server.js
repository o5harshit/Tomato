import express from "express"
import cors from "cors"
import { main } from "./Config/db.js";
import foodRouter from "./Routes/foodRoutes.js";
import UserRouter from "./Routes/UserRoutes.js";
import "dotenv/config";
import CartRouter from "./Routes/CartRoutes.js";
import OrderRouter from "./Routes/OrderRoutes.js";


// app config
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images",express.static('Uploads'));

// database connection

main().then(() => {
    console.log("Connected to Db");
}).catch((err) => {
    console.log(err);
})

// CORS 
// const corsOptions = {
//     origin: [process.env.FRONT_URL,ADMIN_URL],// Allow your front-end's origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization','token'], // Include Content-Type
//     credentials: true
// };

app.use(cors());

// api endpoint

app.use("/api/food",foodRouter);
app.use("/api/user",UserRouter);
app.use("/api/cart",CartRouter);
app.use("/api/order",OrderRouter);

//middleware 

app.use(express.json())


app.listen(port,() => {
    console.log(`App is listening on port ${port}`);
})

app.get("/",(req,res) => {
    res.send("hii");
})
