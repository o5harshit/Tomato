import mongoose from "mongoose";

 export async function main() {
  await mongoose.connect(
    "mongodb+srv://Greatstack:6387222071@cluster0.sugkv.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0"
  );
}

