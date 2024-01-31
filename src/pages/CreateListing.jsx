import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db, auth } from '../firebase.config';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

const CreateListing = () => {
  const [Name, setName] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [near, setNear] = useState('');
  const [Location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('lost'); // Default to 'lost'
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uid , setUid] = useState("");
  const [mobile,setMobile] = useState("")

  const [loading, setLoading] = useState(false);


  const uploadDataToFirestore = async (formData) => {
    try {
      const docRef = await addDoc(collection(db, 'listings'), formData);
      console.log('Document written with ID: ', docRef.id);
      setLoading(false)
      console.log(auth.currentUser.uid)
      toast.success("Created successfully.")
    } catch (error) {
      console.error('Error adding document: ', error);
      setLoading(false)
      toast.error('Failed, please select valid files.')
    } 
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Upload images to Firebase Storage and get download URLs
    const uploadedImageUrls = await Promise.all(
      images.map(async (image) => {
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        const storageRef = ref(storage, `images/${randomNumber}_${image.name}`);
  
        // Upload the image
        await uploadBytesResumable(storageRef, image);
  
        // Introduce a delay before checking for the download URL
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay as needed
  
        // Retrieve the download URL
        try {
          const imageUrl = await getDownloadURL(storageRef);
          return imageUrl;
        } catch (error) {
          // Handle any errors (optional)
          console.error('Error getting download URL: ', error);
          return null; // or throw an error if you want to handle it later
        }
      })
    );
  
    // Set URLs in the local state array
    setImageUrls(uploadedImageUrls.filter(url => url !== null));
  
    const formData = {
      Name,
      itemName,
      description,
      near,
      Location,
      color,
      category,
      imageUrls: uploadedImageUrls.filter(url => url !== null),
      uid , // Filter out any null values
      mobile,
    };
  
    // Create an object with the form data and image URLs
    uploadDataToFirestore(formData);
  };
  
 

  const handleChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    setUid(auth.currentUser.uid)
    console.log(auth.currentUser.uid)
  };

  return (
    <div className="w-[85%] sm:w-[100%] pl-[50px] sm:pl-[0px]">
    <h1 className=" font-bold  text-gray-200 text-center mb-10 mt-6 font-heading text-6xl">Create Listing</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Your Name:</label>
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border  border-white border-opacity-50 p-2 rounded text-white bg-black  font-para placeholder:font-para "
          required
          placeholder='Tell us your full name.'
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Your Mobile:</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border  border-white border-opacity-50 p-2 rounded text-white bg-black  font-para placeholder:font-para "
          required
          placeholder='Tell us your mobile number.'
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full border border-white border-opacity-50 p-2 rounded text-white bg-black font-para placeholder:font-para"
          required
          placeholder='Name of the item you have lost/found.'
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full border border-white border-opacity-50 p-4 pb-10 rounded text-white bg-black font-para placeholder:font-para"
          placeholder='Please give us a detailed description about the item. You could also tell brand and other important identifications.'
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Near:</label>
        <input
          type="text"
          value={near}
          onChange={(e) => setNear(e.target.value)}
          className="w-full border border-white border-opacity-50 p-2 rounded font-para text-white bg-black placeholder:font-para"
          required
          placeholder='Where you have lost/found your item ? ex: school in chennai.'
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Your Location:</label>
        <input
          type="text"
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-white border-opacity-50 p-2 rounded font-para text-white bg-black placeholder:font-para"
          required
          placeholder='Your current location.'
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full border border-white border-opacity-50 p-2 rounded font-para text-white bg-black placeholder:font-para"
          required
          placeholder='Color of the item you have/lost or found.'
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-white border-opacity-50 p-2 rounded font-para text-white bg-black font-para"
          required
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-bold mb-4 text-white font-para text-[22px]">Images:</label>
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="w-full border border-white border-opacity-50 p-4  pb-[10px] font-para rounded text-white bg-black font-para"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-blue-700   font-bold  font-para w-full "
          disabled={loading} // Disable the button when loading is true
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
          {/* You can replace the image URL with your spinner or loading animation */}
          <img src="https://cdn.dribbble.com/users/29051/screenshots/2347771/spinner.mov.gif" alt="Loading spinner" />
        </div>
      )}
    </form>
  </div>
  );
};

export default CreateListing;
