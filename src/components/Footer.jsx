import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const handleLinkedInClick = () => {
    // Navigate to the LinkedIn profile URL
    window.location.href = 'https://www.linkedin.com/in/roshan-r-28529a256/';
  };

  return (
    <div className="flex items-end  justify-center py-4 bg-black text-white">
      <button
        className="flex items-center justify-center py-4 bg-black text-white"
        onClick={handleLinkedInClick}
      >
        <span className="mr-2 font-para text-2xl">Made by RoshanR</span>
        <FaLinkedin className='text-4xl' />
      </button>
    </div>
  );
};

export default Footer;
