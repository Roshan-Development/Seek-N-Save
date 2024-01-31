import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { orderBy, query, where } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import ListingItem from '../components/ListingItem';
// ... (other imports)

const Found = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['authToken']);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        fetchUserListings(user);
        console.log("user exit")
        console.log(auth.currentUser.uid)
      } else {
        // No user is signed in
        setListings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const fetchUserListings = async (user) => {
    const listingRef = collection(db, 'listings');
  
    try {
      const querySnap = await getDocs(listingRef);
      let listings = [];
  
      querySnap.forEach((doc) => {
        const data = doc.data();
        // Check if the document's uid matches the current user's uid
        if (data.category === "found") {
          listings.push({
            id: doc.id,
            data: data,
          });
        }
      });
  
      setListings(listings);
      setLoading(false);
      console.log(listings);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };
  



  return (
    <div className='text-white font-heading text-[50px] pt-10 pb-10 flex flex-col items-center justify-center'>
  
   <h1 className='text-5xl font-heading hover:text-green-600'>Found Items : </h1>
  <div className="mt-4 w-full max-w-screen-lg">
    {!loading && listings && listings.length > 0 ? (
      <>
        
        <div className="grid grid-cols-1 p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-5">
          {listings.map((item) => (
            <ListingItem key={item.id} item={item} profile={false}/>
          ))}
        </div>
      </>
    ) : (
      <p className='text-center text-[10px]'>No listings available.</p>
    )}
  </div>
  {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
          {/* You can replace the image URL with your spinner or loading animation */}
          <img src="https://cdn.dribbble.com/users/29051/screenshots/2347771/spinner.mov.gif" alt="Loading spinner" />
        </div>
      )}
</div>

  );
};



export default Found;