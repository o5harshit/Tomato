import UserModel from "../Models/UserModel.js";

export const AddtoCart = async (req, res) => {
  try {
    let userData = await UserModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    res.json({ success: true, message: error });
  }
};

export const deleteTocart = async (req, res) => {
  try {
    let UserData = await UserModel.findById(req.body.userId);
    let cartData = await UserData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -=  1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const getCart = async (req,res) => {
    try{
    let UserData = await UserModel.findById(req.body.userId);
    let cartData = await UserData.cartData;
    res.json({success:true,message:cartData})
    } catch(err){
        res.json({success:false,message:err});
    }
};
