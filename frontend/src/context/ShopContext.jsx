import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import  axios from 'axios'

export const ShopContext  = createContext();


const ShopContextProvider = (props) =>{

    const currency =  '$';
    const delivery_fee =  10; 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search , setSearch ] = useState('')
    const [showSearch , setShowSearch ] = useState(false)
    const [cartItems ,setCartItems ] = useState({})
    const [products , setProducts ] = useState([])
    const [accountInformation , setAccountInformation ]  = useState([])
    const [reviewInformation , setReviewInformation ] = useState([])
    const [token , setToken ] = useState('')
    const navigate = useNavigate()


    const addToCart =async (itemId,size) =>{
      if(!size)
      {
          toast.error('Select Product Size')
          return;
      }

      let cartData = structuredClone(cartItems);
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
      setCartItems(cartData); //{aaaab: {S:1,L:1,XL:1}}
 
      if(token)
      {
         try {
                 await axios.post(backendUrl + "/api/cart/add",{itemId,size},{
                  headers:{token}
               })
              toast.success("Item Added to Cart!");
         } catch (error) {
              console.log(error);
              toast.error(error.message)
                  
         }
      }
    
    }

    
const getCartCount = () => {
  let totalCount = 0;
  for (const item in cartItems) {
    for (const size in cartItems[item]) {
      const quantity = cartItems[item][size];
      if (quantity > 0) {
        totalCount += quantity;
      }
    }
  }
  return totalCount;
};


const updateQuantity = async (itemId,size,quantity)=>{
         let cartData = structuredClone(cartItems)
          
          cartData[itemId][size] = quantity
       
         setCartItems(cartData)

         if(token)  //  it mean we are logged In
         {
            try {
               await axios.post(backendUrl + "/api/cart/update",{itemId,size,quantity},{
                  headers:{token}  
               });
               
            } catch (error) {
                   console.log(error);
                   toast.error(error.message);
            }
         }
}


const getCartAmount = () =>{
    let totalAmount = 0;
    for(const items in cartItems)
        {  let itemInfo =  products.find((product)=>product._id==items)
            for(const item in  cartItems[items])
             {
                 if(cartItems[items][item] > 0)
                 {
                    totalAmount+=itemInfo.price * cartItems[items][item] 
                 }
             }
        } 
 
    return totalAmount;
}




const getProductsData = async () =>{
     try {
        const response = await axios.get(backendUrl + "/api/product/list");
        if(response.data.success)
        {
           setProducts(response.data.products)
        }else{
            toast.error(response.data.message)
        }
     
      } catch (error) {
        console.log(error)
        toast.error(error.message)
     }
}

const getUserCart = async (token) =>{
  
     try {
       const response = await axios.post(backendUrl + '/api/cart/get',{} ,{
          headers:{token}
       })
       if(response.data.success)
       { 
         setCartItems(response.data.cartData);
       }
     } catch (error) {
         console.log(error);
         toast.error(error.message);
     }
}


const getAccount = async (token) =>{
    try {
      const response = await axios.post(
        backendUrl + "/api/user/profile",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setAccountInformation(response.data.profile);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
   
}


const getReview =  async () =>{
    try {
        const response = await axios.get(`${backendUrl}/api/review/get`)
        if(response.data.success)
        {
           setReviewInformation(response.data.reviews);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}



useEffect(()=>{
  getProductsData()
  getReview()
 
},[])

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (!token && storedToken) {
    getUserCart(storedToken);
    setToken(storedToken);
    getAccount(storedToken)
  }
}, []);





      const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        accountInformation,
        reviewInformation,
        getReview
      };

      return (
          <ShopContext.Provider value={value}>
              {props.children}
          </ShopContext.Provider>
      ) 
}

export default ShopContextProvider