import { v2 as cloudinary } from 'cloudinary'
import ProductModel from '../models/productModel.js';
 
// Function for add product
const addProduct  = async (req,res)=>{

          try {
              const {
                name,
                description,
                price,
                category,
                subCategory,
                sizes,
                bestSeller,
              } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]  
        const image2 = req.files.image2 && req.files.image2[0]  
        const image3 = req.files.image3 && req.files.image3[0]  
        const image4 = req.files.image4 && req.files.image4[0]  

const images = [ image1,image2,image3,image4 ].filter((item)=>item!=undefined)
let imgagesUrl = await Promise.all(
    images.map((async (item)=>{
         let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
           return result.secure_url  
  }))
)

//Multer -->Cloudinary(url) -->DB
const productData = {
      name,
      description,
      category,
      subCategory,
      price:Number(price),
      bestSeller:bestSeller==='true' ? true : false,
      sizes:JSON.parse(sizes),  // String--> Array
      image:imgagesUrl,
      date:Date.now()

}

const product = new ProductModel(productData)
await product.save()

           res.json({success:true,message:' Product Addded '})
          } catch (error) {
                 console.log(error);
                 res.json({ success: false, message: error.message });
          } 
}


// Function for list product
const listProducts  = async (req,res)=>{
        try {
              const products = await ProductModel.find({})
              res.json({success:true,products})    


        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }   
}

// Function for remove product
const removeProduct  = async (req,res)=>{
        try {
             await ProductModel.findByIdAndDelete(req.body.id) 
             res.json({success:true,message:'Product Removed'})
        } catch (error) {
               console.log(error);
               res.json({ success: false, message: error.message });
        }     
}

// Function for single product
const singleProduct  = async (req,res)=>{
        try {
          const { productId } = req.body 
          const product =  await ProductModel.findById(productId)
          res.json({success:true,product}) 
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }   
}



export { listProducts ,addProduct , removeProduct ,singleProduct}