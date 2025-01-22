import UserModel from "../models/userModel.js";

// add products to user Cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // userId => Token
    const userData = await UserModel.findById(userId);
    const cartData = await userData.cartData;
    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await UserModel.findByIdAndUpdate(userId, { cartData }); // { '677f3a5e4542b762c8c5d018': { M: 2, XL: 1 } }
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update user Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
  }
};



// Get user Cart
const getUserCart = async (req, res) => {
  try {
     const { userId } = req.body
const userData =  await UserModel.findById(userId)
let cartData = await userData.cartData;
res.json({success:true,cartData})
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};


export { addToCart, getUserCart, updateCart };
