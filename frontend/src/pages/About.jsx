import React from 'react'
import Title from "../components/Title";
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from "../components/NewsLetterBox";


const About = () => {
  return (
    <div>
      <div className="text-2xl pt-8 border-t text-center">
        <Title text1={"ABOUT"} text2={"US"} />
        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img
            className="w-full md:max-w-[450px]"
            src={assets.about_img}
            alt=""
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>
              Our mission is to bring you the best in, blending innovation,
              style, and functionality to meet your unique needs. Shop with
              confidence and discover the difference.
            </p>
            <p>
              At FOREVER, we’re more than just a store. We’re a community
              dedicated to providing high-quality products, exceptional value,
              and a shopping experience you’ll love.
            </p>
            <b className="text-gray-800">Our Mission</b>
            <p>
              We are committed to delivering top-notch customer service and a
              seamless shopping experience. Our team works tirelessly to bring
              you the best products at competitive prices, ensuring your
              satisfaction with every order.
            </p>
          </div>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            With a passion for quality and an eye for detail, we bring you the
            finest products that fit your lifestyle. Enjoy fast shipping, secure
            payments, and excellent customer support with every purchase.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Our Values:</b>
          <p className='text-gray-600'>
            At FOREVER, we believe in integrity, transparency, and
            customer-centric service. We prioritize your needs, ensuring you
            receive the best products with an experience that keeps you coming
            back.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            We care about the environment and are committed to sustainable
            practices. From eco-friendly products to responsible packaging, we
            take steps to reduce our impact and promote a greener future.
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
}

export default About
