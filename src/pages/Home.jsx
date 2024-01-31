import React, { useEffect } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaRegSadCry } from 'react-icons/fa';
import { ImHappy } from 'react-icons/im';
import ReactTypingEffect from 'react-typing-effect';
import { useCookies } from 'react-cookie';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import PrivateRoute from '../components/PrivateRoute';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [cookies] = useCookies(['user']);
  const isLoggedIn = !!cookies.user;
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User logged in'); // Log if the user is logged in
      } else {
        // Check if the 'user' cookie exists
        const isUserLoggedIn = !!cookies.user;
  
        // Log whether the user is logged in based on the cookie
        console.log(isUserLoggedIn ? 'User logged in' : 'User not logged in');
      }
    });
  
    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, []); // Include cookies in the dependency array to rerun the effect when cookies change
  

  return (
    
    <div className="bg-black min-h-screen flex flex-col pt-[120px] items-center">
      <div className="text-center max-w-md m">
        <h1 className="font-bold text-green-500 uppercase font-heading text-[48px]">
          Reuniting Possessions, <br />
        </h1>
        <h1 className="font-bold mb-6 text-green-500 uppercase font-heading text-[48px]">
          Restoring{' '}
          <ReactTypingEffect
            text={['Smiles.']}
            speed={100}
            eraseDelay={400}
            className="inline text-gray-200 uppercase font-heading text-[47px]"
          />
        </h1>

        
        
          <p className="text-lg mb-10 text-gray-100 font-para text-[25px] w-[90%] pl-[15px] sm:w-[100%] sm:pl-[0px] ">
            Welcome to SeekAndSave, where lost items find their way back home. Our mission is to bring joy by reuniting
            you with your cherished possessions. Join our community, share your lost stories, and experience the magic of
            reconnection.
          </p>
        
      </div>
      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <button className="bg-black border-white border text-white py-2 px-4 rounded-md transition duration-300 hover:bg-white hover:text-black" onClick={()=>{navigate("/lost")}}>
          <div className="flex items-center font-para text-2xl">
            Lost Something <FaRegSadCry className="ml-1 text-red-900" />
          </div>
        </button>
        <button className="bg-black border-white border text-white py-2 px-4 rounded-md transition duration-300 hover:bg-white hover:text-black" onClick={()=>{navigate("/found")}}>
          <div className="flex items-center font-para text-2xl">
            Return Something <ImHappy className="ml-1 text-green-800" />
          </div>
        </button>
      </div>
    </div>
    
  );
};

export default Home;
