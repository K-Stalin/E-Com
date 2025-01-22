# E-Commerce Website

## Overview
An advanced and user-friendly e-commerce platform that provides seamless shopping experiences, robust admin capabilities, and integrated sentiment analysis for user reviews. 

![image](https://github.com/user-attachments/assets/1ae37f33-0bb0-48ff-99ea-1dbaf94ca3cc)





## Features

### **User Features**
- **Search Functionality:**
   - Quickly find products using the search bar with keyword-based results.
- **Categories and Sub-categories:**
   - Navigate products by categories and sub-categories for ease of discovery.
- **Price Sorting:**
   - Sort products from **Low to High** and **High to Low** prices.
- **Add to cart:**
   - Add products to the cart for smooth checkout experience.
   - Update product quantities in the cart.
   - Delete items from the cart with ease.
- **Payment Gateway:**
   - Secure online payments powered by **Stripe**.

### **Admin Features**
- **Manage Products:**
   - Add new items to the store inventory.
   - Remove items to the store inventory.
- **Order Management:**
   - Update order statuses (e.g. **Placed**,**Shipping**,**Delivered**)

### **Sentiment Analysis**
- Analyze user reviews to extract negative reviews


## Installation

  1. **Clone the Repository**
       ```git clone
       https://github.com/K-Stalin/E-Com.git

  2. **Install Dependencies**
       ```
       npm install

  3. **Environment Setup**
      - create a .env file  for Frontend  and Admin
          ```
          VITE_BACKEND_URL = <your-backend-url>
      - create a .env file for backend
          ```
          MONGODB_URI = <your-database-url>
          CLOUDINARY_API_KEY = <your-cloudinary-api-key>
          CLOUDINARY_SECRET_KEY = <your-cloudinary-secret-key>
          CLOUDINARY_NAME = <your-cloudinary-name>
          JWT_SECRET= <your-jwt-secret-key>
          ADMIN_EMAIL = <your-admin-email>
          ADMIN_PASSWORD = <your-admin-password>
          STRIPE_SCRET_KEY = <your-stripe-secret-key>

  4. **Start the Application**
      - Frontend and Admin
         ```
         npm run dev
      - Backend
         ```
         npm run server

# Tech Stack
 - Frontend:HTML,Tailwind CSS,JavaScript,React.js
 - Backend:Node.js,Express.js
 - Database:MongoDB
 - Payment Gateway:Stripe
 - Sentiment Analysis:Implemented using the sentiment npm package for quick and efficient evaluation of user reviews.

# Contact
 For any queries please reach out to:
  - Email:**stalinkumanan@gmail.com**
  - LinkedIn:(https://www.linkedin.com/in/k-stalin/)
      

