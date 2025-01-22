import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type:Boolean},
  date:{type:Number,required:true}
});



// if its available not created
const ProductModel = mongoose.model.ProductModel || mongoose.model('ProductModel',productSchema)


export default ProductModel
