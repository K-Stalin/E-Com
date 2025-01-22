import express from 'express'
import { allReviews, SubmitOrder } from '../controllers/reviewController.js'


const  reviewRouter =  express.Router()


reviewRouter.post('/add',SubmitOrder)
reviewRouter.get('/get',allReviews)


export default reviewRouter