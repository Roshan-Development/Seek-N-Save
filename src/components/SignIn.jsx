import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { auth, provider } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Profile from '../pages/Profile';
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';

const SignIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  const [loading, setLoading] = useState(false);

  const onGoogleAuth = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setCookie('authToken', user.uid, { path: '/' });
      toast.success("Welcome " + auth.currentUser.displayName);
      console.log(auth.currentUser.displayName);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed. Please try again.");
    } finally {
      setTimeout(() => setLoading(false), 1000); // Hide loading spinner after 1 second
    }
  };

  const onLogout = () => {
    removeCookie('authToken', { path: '/' });
    signOut(auth);
    navigate('/');
  };

  const renderProfileOrSignInButton = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center">
          <BarLoader color="#ffffff" loading={loading} css={override} />
        </div>
      );
    } else if (cookies.authToken) {
      return <Profile />;
    } else {
      return ( 
        <button
          onClick={onGoogleAuth}
          className="flex items-center hover:bg-gray-200 hover:text-black px-3 py-2 rounded transition duration-300 font-para text-white text-2xl"
        >
          Sign In <span className="inline"><FaGoogle className="ml-1" /></span>
        </button>
        
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      {renderProfileOrSignInButton()}
    </div>
  );
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default SignIn;
