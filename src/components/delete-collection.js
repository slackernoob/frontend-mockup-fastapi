"use client";


import React, { useState } from 'react';
import { deleteCollection } from '../services/api-service';

const DeleteCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await deleteCollection(collectionName);
      setMessage(result.status);
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Delete Collection</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={collectionName} 
          onChange={(e) => setCollectionName(e.target.value)} 
          placeholder="Collection Name" 
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded text-black">
          Delete
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default DeleteCollection;
