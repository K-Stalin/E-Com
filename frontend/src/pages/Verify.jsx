import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

   const { navigate, backendUrl , token, setCartItems  } = useContext(ShopContext) 

const [searchParams] = useSearchParams();

const success = searchParams.get("success");
const orderId = searchParams.get("orderId");





const verifyPayment = async () =>{
    try {
           if(!token) return null  // stop the execution

            const response = await axios.post(
              `${backendUrl}/api/order/verifyStripe`,{success,orderId},
              {
                 headers:{token}
              }
            );

            if(response.data.success)
            {
                 setCartItems({})
                 toast.success(response.data.message)
                 navigate("/orders")
            }
            else
            {    
                    toast.success(response.data.message);
                 navigate('/cart')
            }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
     
}


useEffect(()=>{
  verifyPayment()
},[token])

  return (
    <div>
       
    </div>
  )
}

export default Verify
