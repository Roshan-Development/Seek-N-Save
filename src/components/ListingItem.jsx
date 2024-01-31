// ListingItem.jsx
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link } from 'react-router-dom';
import { IoLocation } from "react-icons/io5";

const ListingItem = ({ item, profile, onDelete }) => {
  const { Location, itemName, imageUrls, category, id , near } = item.data;
  console.log(item.id)

  const getBorderColor = () => {
    return category === 'lost' ? 'border-red-500' : 'border-green-600';
  };

 
  

  return (
    
    <div className={`my-5 xl:p-6 xl:pl-5 ml-2 mr-2 pr-5 pl-5 pt-5 pb-5 border sm:w-[100%] w-[90%] rounded ${getBorderColor()}`}>
        <Link className='contents' to={`/separate-page/${item.id}`}>
      {imageUrls && imageUrls.length > 0 && (
        <div className="relative overflow-hidden rounded h-40">
          <img
            src={imageUrls[0]}
            alt={`Cover for ${itemName}`}
            className="w-full h-full object-cover max-w-full"
          />
        </div>
      )}
      <div className="mt-2 font-heading">
        <h3 className="text-3xl font-bold">  {itemName}</h3>
        <p className="flex items-center text-[15px] mt-1 text-gray-100 text-bold font-para uppercase">
  <IoLocation className="mr-1" /> {near}
</p>

        {profile && (
         
            <button onClick={()=>onDelete(item.id)} className="text-red-500">
              <FaTrashAlt className="text-xl" />
            </button>
          
        )}
      </div>
      </Link>
    </div>
  );
};

export default ListingItem;
