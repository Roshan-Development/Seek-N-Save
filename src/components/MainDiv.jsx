import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import { IoCallOutline } from "react-icons/io5";
const MainDiv = ({ item, profile, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

    const [isVerified, setIsVerified] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
  
    const handleVerification = () => {
      if (isVerified) {
        // Perform the action you want after reCAPTCHA verification (e.g., show mobile number)
        setMobileNumber(mobile); // Replace with the actual logic for retrieving the mobile number
      } else {
        // Handle the case when reCAPTCHA verification fails
        alert('reCAPTCHA verification failed');
      }}

  const { Location, itemName, imageUrls, category, id, Name, near, ownerName, color, description  ,mobile } = item.data;

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const getBorderColor = () => {
    return category === 'lost' ? 'border-red-500' : 'border-green-600';
  };

  const sliderSettings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col items-center w-full md:w-[500px]  lg:w-[800px] xl:w-[1200px]  mb-10 justify-center">
      <h1 className='text-center mt-0 pr-4 sm:pr-0 text-4xl lg:text-3xl xl:text-4xl'>Item: {itemName}</h1>
      <div className="flex flex-col sm:flex-row w-full pl-5 pr-5 justify-center items-center">
        <div className="w-full sm:w-[40%] p-4 mb-4 sm:mb-0">
          {imageUrls && imageUrls.length > 0 && (
            <Slider key={id} {...sliderSettings} className="mt-4">
              {imageUrls.map((imageUrl, index) => (
                <div key={index}>
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto object-cover max-w-full rounded"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>

        
        <div className="w-full sm:w-[60%] p-4 justify-center xl:pl-10 items-center overflow-hidden">
  <div className='text-white text-[32px] mb-2'>
    My Name: {Name}
  </div>
  <div className='text-white text-[32px] mb-2'>
    {category ? "found" : "lost"} Near: {near}
  </div>
  <div className='text-white text-[32px] mb-2'>
    Color: {color}
  </div>
  <div className='text-white text-[32px] mb-2'>
    Person's Location: {Location} 
  </div>
  <div className='text-white text-[32px] max-w-[200px] max-h-[200px] overflow-auto'>
    <span className='block'>
      Description: 
    </span>
    <div className='flex text-[22px] w-[100%] max-w-[600px]'>
  {description}
</div>

  </div>
</div>

        

      </div>
      
      <div className="flex sm:flex-row flex-col space-x-10">
  <button className='text-white' onClick={handleVerification}>
    {isVerified ? <div className="flex items-center text-[30px] mt-1 text-gray-100 text-bold font-para uppercase">
  <IoCallOutline className="mr-1" /> {mobile}
</div>: "Show Mobile"}
  </button>
  
  <ReCAPTCHA className=' pr-5'
    sitekey="6LfQSpsoAAAAAPaw5ZvGErrVI8DPFkV_XuQN-Pmv"
    onChange={(value) => setIsVerified(!!value)}
  />
</div>

    </div>
  );
};

export default MainDiv;
