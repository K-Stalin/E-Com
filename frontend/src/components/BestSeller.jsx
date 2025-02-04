import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from "./ProductItem";


const BestSeller = () => {

 const { products } = useContext(ShopContext) 
 const  [ bestSeller , setbestSeller]  = useState([])

 useEffect(()=>{
 
 const bestProduct = products.filter((item) => item.bestSeller == true); 
 setbestSeller(bestProduct.slice(0,5))
 },[products]) //  only once run


  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
          aspernatur delectus quis labore? Rem recusandae mollitia dolore saepe
          dolorum deleniti totam, omnis perferendis atque natus, ad repellat,
          vitae rerum fugit!
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        
        {/* Before Check to Use */}
        { bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center ">No products available</p>
        )}
      </div>
    </div>
  );
}

export default BestSeller
