import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Get products from context
  const [latestproducts, setLatestproducts] = useState([]); // State for latest products

  useEffect(() => {
    setLatestproducts(products.slice(0, 10));
  }, [products]); // Runs only once

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
          aspernatur delectus quis labore? Rem recusandae mollitia dolore saepe
          dolorum deleniti totam, omnis perferendis atque natus, ad repellat,
          vitae rerum fugit!
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproducts.length > 0 ? (
          latestproducts.map((item) => (
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
};

export default LatestCollection;
