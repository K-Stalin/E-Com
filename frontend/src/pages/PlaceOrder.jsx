import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

const [ method , setMethod ]= useState('cod')
const { navigate , backendUrl, token , cartItems , setCartItems, getCartAmount , delivery_fee , products   } = useContext(ShopContext)
const  [formData ,setFormData ] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
})

const onChangeHandler = (e) =>{
     const name = e.target.name
     const value = e.target.value
     setFormData((prev)=>({...prev,[name]:value}))
}

const onSumbitHandler =  async (e) =>{
    e.preventDefault()
    try {
      let orderItems = []
      for(const items in cartItems)
        {
            for (const item in cartItems[items])
            {
                if(cartItems[items][item] > 0)
                {
                    const itemInfo = structuredClone(products.find((product)=>product._id === items)) // create a copy 
                     
                    if(itemInfo)
                     {
                        itemInfo.size = item
                        itemInfo.quantity = cartItems[items][item]; 
                        orderItems.push(itemInfo)  // size:'M' , quantity:1,_id:"677f3a5e4542b762c8c5d018";
                     }
                }
            }
        }   
      let orderData = {
         address:formData,
         items:orderItems,
         amount:getCartAmount() + delivery_fee
      }  
       
    switch (method) {
      // API call for COD
      case "cod":
        try {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: { token },
            }
          );

          if (response.data.success) {
            setCartItems({}); // Clear the cart
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("An error occurred while placing the COD order");
          console.error(error);
        }
        break;

      // API call for Stripe
      case "stripe":
        try {
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            {
              headers: {
                token,
                origin: window.location.origin,
              },
            }
          );

          if (responseStripe.data.success) {
            const { success_url } = responseStripe.data;
            if (success_url) {
              window.location.replace(success_url);
            } else {
              toast.error("Success URL not provided by Stripe");
            }
          } else {
            toast.error(responseStripe.data);
            console.log(responseStripe.data);
          }
        } catch (error) {
          console.error(error.message);
        }
        break;

      default:
        break;
    }


    } catch (error) {
        console.log(error)
        toast.error(error.message)
    } 

}

  return (
    <form   onSubmit={onSumbitHandler}   className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* -----------Left Side------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
            type="text"
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
            type="text"
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email Address"
          type="email"
          onChange={onChangeHandler}
          name='email'
           value={formData.email}
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          type="text"
          onChange={onChangeHandler}
          name='street'
           value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            type="text"
            onChange={onChangeHandler}
             value={formData.city}
            name='city'
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            type="State"
            onChange={onChangeHandler}
            name='state'
             value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zip Code"
            type="number"
            onChange={onChangeHandler}
            name='zipcode'
             value={formData.zipcode}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            type="text"
            onChange={onChangeHandler}
            name='country'
             value={formData.country}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
          type="number"
          onChange={onChangeHandler}
          name='phone'
           value={formData.phone}
          required
        />
      </div>
      {/* ---------------Right Side----------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* -----------Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                } }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full 
                ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
            <div className='w-full text-end mt-8'>
                <button type='submit'  className='bg-black py-4 px-14 text-white'>PLACE ORDER</button>
            </div>

        </div>
      </div>
    </form>
  );
}

export default PlaceOrder
