import React, { useEffect, useState, useContext } from "react";
import profilePic from "../assets/frontend_assets/profilePic.svg";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    accountInformation,
    token,
    backendUrl,
    reviewInformation,
    getReview,
  } = useContext(ShopContext);
  const [btnText, setbtnText] = useState(true);
  const [name, setName] = useState("");
  const [profilePicName , setprofilePicName ] = useState('')
  const [email, setEmail] = useState("");
  const [reviewText, setreviewText] = useState("");
  const [starRating, setstarRating] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  // Handling the edit/cancel button
  const handlebtn = () => {
    setbtnText(!btnText);
  };

  // Handle save button click (Update profile)
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/update`,
        { name, email },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setbtnText(true)
         setprofilePicName(name);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    if (accountInformation) {
      setName(accountInformation.name);
      setprofilePicName(accountInformation.name)
      setEmail(accountInformation.email);
    }
  }, [accountInformation]); // Re-run effect when accountInformation changes

  




 const  handleReviewSubmit = async  (e) =>
 {
  e.preventDefault()
  const response = await axios.post(`${backendUrl}/api/review/add`,{reviewText,starRating, reviewerName})
     if(response.data.success)
     {
         toast.success(response.data.message)
         getReview()
         setReviewerName('')
         setreviewText('')
         setstarRating('')
     }
     else
     {
       toast.error(response.data.message)
     }
 }


setTimeout(()=>{
 getReview()
},9000) 

  return (
    <div>
      <div className="flex gap-2 pb-4">
        <div>
          <img src={profilePic} alt="" />
        </div>
        <div>
          <span className="text-[12px]">Hello,</span>
          <h3 className="sm:text-base font-medium">{profilePicName}</h3>
        </div>
      </div>

      <Title text1={"Personal Information"} />
      <button
        onClick={handlebtn}
        className="text-[blue] pl-4 font-medium cursor-pointer"
      >
        {btnText ? "Edit" : "Cancel"}
      </button>
      <div className="flex  flex-col gap-4">
        <div
          className={`flex flex-col border pt-1 pb-1 pl-2 pr-2  w-[80%] sm:w-[25%] ${
            btnText ? "cursor-not-allowed" : null
          }`}
        >
          {btnText ? null : <span className="text-[12px]">Name</span>}
          {btnText ? (
            <h3>{name}</h3>
          ) : (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="focus:outline-none w-[90%]"
              type="text"
            />
          )}
        </div>
        <div
          className={`flex flex-col border pt-1 pb-1 pl-2 pr-2  w-[80%] sm:w-[25%] ${
            btnText ? "cursor-not-allowed" : null
          }`}
        >
          {btnText ? null : <span className="text-[12px]">Email</span>}
          {btnText ? (
            <h3>{email}</h3>
          ) : (
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="focus:outline-none w-[90%]"
              type="text"
            />
          )}
        </div>
        {btnText ? null : (
          <div className="bg-[blue] text-[white] pl-6 pr-6 text-center pt-4 pb-2 rounded cursor-pointer  w-[80%] sm:w-[25%]">
            <button onClick={handleSave}>SAVE</button>
          </div>
        )}
      </div>
      <p className="mt-2">{"  "}</p>
      <Title text1={"Customer Reviews"} />
      <div className="customer-reivew">
        {reviewInformation.map((item) => (
          <div className="border-b" key={item._id}>
            <h4 className="text-[#007bff] mt-2">{item.reviewerName}</h4>
            <span>
              
              {item.starRating == 1
                ? "⭐"
                : item.starRating == 2
                ? "⭐⭐"
                : item.starRating == 3
                ? "⭐⭐⭐"
                : item.starRating == 4
                ? "⭐⭐⭐⭐"
                : "⭐⭐⭐⭐⭐"}
            </span>
            <p className="mt-2 mb-2">{item.reviewText}</p>
            <p className="text-[#999] text-[0.8rem] mb-2">
              Posted on {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-[#f7f7f7] p-6 mt-6">
        <h2 className="text-[#333] mt-2 mb-2 font-medium">Write a Review</h2>
        <form className="flex flex-col" onSubmit={handleReviewSubmit}>
          <label className="mt-4">Your Review</label>
          <input
            className="border border-[#ddd] focus:outline-none p-2 h-[40px] mb-4"
            placeholder="Write your Name"
            required
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
          ></input>
          <textarea
            className="border border-[#ddd] focus:outline-none p-2 h-[100px]"
            placeholder="Write your review here..."
            required
            value={reviewText}
            onChange={(e) => setreviewText(e.target.value)}
          ></textarea>
          <label className="mt-4">Rating:</label>
          <select
            className="border focus:outline-none border-[#ddd] p-2 w-[100%]"
            value={starRating}
            onChange={(e) => setstarRating(e.target.value)}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
          <button
            type="submit"
            className="bg-[#007bff] text-[#fff] border-none inline-block w-[50%] sm:w-[20%] mt-4 rounded p-2 cursor-pointer"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
