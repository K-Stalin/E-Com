import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from 'stripe' 


//Global Variable
  const currency = "usd"; // Define the currency
  const devliveryCharge = 10; // Define delivery charge


//Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SCRET_KEY);

// Placing orders using COD Method
const placeOrder  = async (req,res) =>{
     try {
   // products data
    const { userId, items, amount, address } = req.body;
    //  auth.js for using taken userId***
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
      const newOrder =  new OrderModel(orderData)
      await newOrder.save()

    // Whenever the order placed to clear cart item 
    await UserModel.findByIdAndUpdate(userId,{cartData:{}})  
     res.json({success:true,message:'Order Placed'})    
     } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     }
}





// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers; 
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: devliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
   res.json({ success: true, success_url: session.url });
  } catch (error) {
    console.error("Error in placeOrderStripe:", error);
    res.json({ success: false, message: error.message });
  }
};


// Verify Stripe
const verifyStripe = async  (req,res) =>{
    const { orderId , success , userId } = req.body

   
    try {
     if (success === 'true') {
      
       await OrderModel.findByIdAndUpdate(orderId, { payment: true });
       await UserModel.findByIdAndUpdate(userId, { cartData: {} });
       return res.json({
         success: true,
         message:
           "Payment completed successfully. Thank you for your purchase!",
       });
     } else {
       await OrderModel.findByIdAndDelete(orderId);
       return res.json({
         success: false,
         message: "Payment failed. Please try again.",
       });
     }

    } catch (error) {
         console.error("Error in placeOrderStripe:", error);
         res.json({ success: false, message: error.message });
    }
}


// Placing orders using Razorpay Method
const placeOrderRazorpay  = async () =>{
     
}



// All Orders Data for Admin Panel
const allOrders  = async (req,res) =>{
    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    } 
}



// User Order data for Frontend
const userOrders =  async (req,res) =>{
         try {
            
          const { userId } = req.body
         
        const orders = await OrderModel.find({userId})
        res.json({success:true,orders})
        
          } catch (error) {
             console.log(error);
             res.json({ success: false, message: error.message });
         } 
}

// update orders status for only Admin
const updateStatus = async (req,res) =>{
     try {
       const { orderId , status }  = req.body     
       
       const order = await OrderModel.findByIdAndUpdate(orderId,{status})

       res.json({success:true,message:'Status Updated'})

     } catch (error) {
           console.log(error);
           res.json({ success: false, message: error.message });
     }

}


export {verifyStripe ,  placeOrder , placeOrderStripe , placeOrderRazorpay ,allOrders , userOrders ,updateStatus}