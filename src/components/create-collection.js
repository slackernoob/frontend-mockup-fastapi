"use client";

import React, { useState } from 'react';
import { createCollection } from '../services/api-service';

const CreateCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createCollection(collectionName);
      setMessage(result.status);
      setCollectionName(''); // Clear the input box
      clearMessageAfterDelay();
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.detail);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };
  
  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage('');
    }, 5000); // Clear the message after 5 seconds
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Create Collection</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={collectionName} 
          onChange={(e) => setCollectionName(e.target.value)} 
          placeholder="Collection Name" 
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default CreateCollection;
