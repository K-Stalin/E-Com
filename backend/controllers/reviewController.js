import ReviewModel from "../models/reviewModel.js";
import sentiment from 'sentiment'

// All reviews
const allReviews = async (req,res) =>{
   try {
      const reviews = await ReviewModel.find({}) 
     res.json({success:true,reviews})
   }  catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
     
}


// Submit Order
const  SubmitOrder =  async (req,res) =>{
     try {
       const { reviewText, starRating, reviewerName } = req.body;
       const reviewData = {
         reviewerName,
         reviewText,
         starRating,
       };
     
       const newReview = new ReviewModel(reviewData);
       await  newReview.save()
      res.json({success:true,message:'Submited Successfuly!'})
        SentimentAnalsis(reviewText);
     } catch (error) {
              console.log(error);
              res.json({ success: false, message: error.message });
     } 

}


// Sentiment Analsis
const SentimentAnalsis = async (reviewText) => {
  try {
    const sentimentAnalyze = new sentiment();
    const result = sentimentAnalyze.analyze(reviewText);
    if(result.negative.length > 0)
    { 
      setTimeout(async () => {
        const output = await ReviewModel.deleteMany({
          reviewText: { $regex: result.negative[0], $options: "i" },
        });
        console.log("Removed SuccessFuly!");
      }, 5000);
    }
    else
    {
       console.log('Negative words are not found')
    }
  } catch (error) {
      console.log(error);
  }
};






export { allReviews ,SubmitOrder }