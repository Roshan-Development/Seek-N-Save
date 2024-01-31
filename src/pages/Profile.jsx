import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { orderBy, query, where } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import ListingItem from '../components/ListingItem';
import { deleteDoc, doc } from 'firebase/firestore';


// ... (other imports)

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['authToken']);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const onDelete = async (id) => {
    try {
      // Ask for confirmation before deleting
      const confirmDelete = window.confirm('Are you sure you want to delete this item?');
  
      if (!confirmDelete) {
        // If the user cancels the deletion, do nothing
        return;
      }
  
      console.log('Deleting document with ID:', id);
  
      // Delete the document from Firebase
      const listingDocRef = doc(db, 'listings', id);
      await deleteDoc(listingDocRef);
  
      
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

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
  }, [onDelete, listings]); // Empty dependency array means this effect runs once when the component mounts

  const fetchUserListings = async (user) => {
    const listingRef = collection(db, 'listings');
  
    try {
      const querySnap = await getDocs(listingRef);
      let listings = [];
  
      querySnap.forEach((doc) => {
        const data = doc.data();
        // Check if the document's uid matches the current user's uid
        if (data.uid === user.uid) {
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
  

  const onLogout = () => {
    // Sign out the user
    signOut(auth);

    // Log out the authToken cookie
    console.log('Logging out:', cookies.authToken);

    // Remove the authToken cookie to log the user out
    removeCookie('authToken', { path: '/' });

    // Optionally, navigate to the home page after logging out
    navigate('/');
  };

  return (
    <div className='text-white font-heading text-[50px] pt-10 pb-10 flex flex-col items-center justify-center'>
  <div className='flex xl:flex-row flex-col space-x-10'>
  <button
    onClick={onLogout}
    className="mt-4 bg-red-500 text-white px-3 py-2 rounded transition duration-300 hover:bg-white hover:text-black"
  >
    Logout
  </button>

  <button
    onClick={()=>{ navigate("/create-listing")}}
    className="mt-4 bg-green-600 text-white px-3 py-2 ml-auto mr-auto mb-4 rounded w-[100%] transition duration-300 hover:bg-white hover:text-black"
  >
    Create Listing
  </button></div>
  <div className="mt-4 w-full max-w-screen-lg">
    {!loading && listings && listings.length > 0 ? (
      <>
        <h2 className='text-white text-5xl  mb-4'>My Listings</h2>
        <div className="grid grid-cols-1 p-12  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {listings.map((item) => (
            <ListingItem key={item.id} item={item} profile={true} onDelete={()=>onDelete(item.id)}/>
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



export default Profile;
