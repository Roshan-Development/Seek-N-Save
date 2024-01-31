import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { orderBy, query, where } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import ListingItem from '../components/ListingItem';
import { useParams } from 'react-router-dom';
import MainDiv from '../components/MainDiv';
// ... (other imports)

const SeparatePage = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['authToken']);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const param = useParams()

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
        if (doc.id === param.itemId) {
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
  
   <h1 className='text-5xl font-heading'></h1>
  <div className="mt-4 w-full max-w-screen-lg">
    {!loading && listings && listings.length > 0 ? (
      <>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {listings.map((item) => (
            <MainDiv key={item.id} item={item} profile={false}/>
          ))}
        </div>
      </>
    ) : (
      <p>No listings available.</p>
    )}
  </div>
</div>

  );
};



export default SeparatePage;