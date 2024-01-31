import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { auth, provider } from '../firebase.config';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCookies } from 'react-cookie';

const Header = () => {
  const navigate = useNavigate(); // Get the navigate function

  
  const [cookies] = useCookies(['authToken']);
  const loggedIn = !!cookies.authToken;



  const onGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Sign in success');
    } catch (err) {
      console.log(err);
    }
    console.log(auth.currentUser.email);
  };

  return (
    <header className="bg-black text-white p-4 sticky">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side with logo */}
        <div className="flex items-center">
          <button onClick={() => navigate('/')}>
            {/* Navigate to home ("/") when logo is clicked */}
            <img
              src="https://images4.imagebam.com/e6/9a/2d/MEOIQ13_o.png"
              alt="Logo"
              className="h-12 w-auto mr-2"
            />
          </button>
        </div>

        {/* Right side with buttons */}
        <div className="flex items-center space-x-0 sm:space-x-4">
          <button
            onClick={() => navigate('/lost')}
            className="hover:bg-gray-200 hover:text-black px-3 py-2 rounded transition duration-300 font-para text-2xl"
          >
            Lost
          </button>
          <button
            onClick={() => navigate('/found')}
            className="hover:bg-gray-200 hover:text-black px-3 py-2 rounded transition duration-300 font-para text-2xl"
          >
            Found
          </button>
          <button
            onClick={()=> navigate('/sign-in')}
            className="flex items-center hover:bg-gray-200 hover:text-black px-3 py-2 rounded transition duration-300 font-para text-2xl"
          >
            {loggedIn ?"Profile": "Sign In"}<span className="inline"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
