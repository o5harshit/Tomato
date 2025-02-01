import foodModel from "../Models/foodModel.js";
import fs from 'fs'


export const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        image : image_filename,
        category : req.body.category,
    });
    try{
        await food.save()
        res.json({success : true,message : "Food Added"})
    } catch(err){
        console.log(err);
        res.json({success : false,message:err});
    }
}

export const seeFoodList = async (req,res) => {
    try{
    const FoodList = await foodModel.find({});
    res.json({success : true,data : FoodList});
    } catch(err){
        res.json({success : false,message : err});
    }
}

export const RemoveFooditem = async (req,res) => {
    try{
        const deleteFood = await foodModel.findById(req.body.id);
        console.log(req.body);
        console.log(deleteFood);
        fs.unlink(`Uploads/${deleteFood.image}`,() => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success : true,message : "food Removed"});
    } catch(err){
        console.log(err);
        res.json({success : false,message : err});
    }
}