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
  const [agreed, isAgreed] = useState(false);

  const onGoogleAuth = async () => {
    try {
      setLoading(true);

      if (!agreed) {
        toast.error('Please agree to the terms and conditions.');
        return;
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setCookie('authToken', user.uid, { path: '/' });
      toast.success('Welcome ' + auth.currentUser.displayName);
      console.log(auth.currentUser.displayName);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Authentication failed. Please try again.');
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
        <>
          <div className="flex flex-col ml-auto mr-auto max-w-[600px] pl-10 ">
            <h1 className="text-white font-heading text-[32px] ml-auto mr-auto mb-4 mt-4">
              TERMS AND CONDITIONS
            </h1>
            <p className="text-lg mb-10 text-gray-100 font-para text-[25px] w-[90%] pl-[15px] sm:w-[100%] sm:pl-[0px] ">
              <p className="mb-2">
                1. <span className="text-green-600 font-heading text-2xl">Compliance with Laws:</span> You agree to use
                this website in compliance with applicable laws and these terms.
              </p>
              {/* ... (similar structure for other points) */}
              <p className='mb-2'>2. <span className='text-green-600 font-heading text-2xl'>Personal Details Sharing:</span> If you choose to share personal details, they will be displayed on the website only if you opt to share.</p>
            <p className='mb-2'>3. <span className='text-green-600 font-heading text-2xl'>Prohibition of Web Scraping:</span> Web scraping is strictly prohibited. Any violation will result in the termination of your account, including all associated data.</p>
            <p className='mb-2'>4 .<span className='text-green-600 font-heading text-2xl'>Privacy with Google v2 reCAPTCHA:</span> This website is powered by Google v2 reCAPTCHA to ensure privacy. Only logged-in users can access your data.</p>
            <p className='mb-2'>5 .<span className='text-green-600 font-heading text-2xl'>Termination for Spam and Suspicious Activity:</span> Spam and other suspicious activities will lead to the termination of your account.</p>
            <p className='mb-2'>6 .<span className='text-green-600 font-heading text-2xl'>Guidelines:</span> Posting illegal, explicit, or sexually explicit content will result in the termination of your account.

</p>
              <p>
                <input
                  className="text-white text-3xl"
                  onChange={() => {
                    isAgreed(!agreed);
                  }}
                  type="checkbox"
                />{' '}
                <span className="text-red-600 uppercase font-heading text-2xl">Agree the terms and conditions to Sign In or Log In.</span>
              </p>
            </p>

            <button
              onClick={onGoogleAuth}
              disabled={!agreed} // Disable the button if terms are not agreed
              className="flex items-center justify-center bg-gray-200 hover:bg-green-600 w-[70%] ml-auto mr-auto text-black px-3 py-2 rounded transition duration-300 font-para text-2xl"
            >
              Sign In <span className="inline"><FaGoogle className="ml-1" /></span>
            </button>
          </div>
        </>
      );
    }
  };

  return <div className="flex items-center justify-center h-full">{renderProfileOrSignInButton()}</div>;
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default SignIn;
