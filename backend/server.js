import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudnary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import reviewRouter from './routes/reviewRoute.js'



//App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudnary()


// middleware
app.use(express.json()) // parsed
app.use(express.urlencoded({ extended: true }));
app.use(cors())  //  acess from any IP


//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use('/api/review',reviewRouter)

// Server Start => listen()
app.listen(port,()=>{
      console.log(`http://localhost:${port}`)
})

