import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
      userId:{type:String,required:true},
      items:{type:Array,required:true},
      amount:{type:Number,required:true},
      address:{type:Object,required:true},
      status:{type:String,required:true,default:'Order Placed'},
      paymentMethod:{type:String,required:true},
      payment:{type:Boolean,required:true,default:false},  
      date:{type:Number,required:true}  //  when ever the order Placed date
})


const OrderModel = mongoose.model.OrderModel || mongoose.model("OrderModel", orderSchema);

export default OrderModel;