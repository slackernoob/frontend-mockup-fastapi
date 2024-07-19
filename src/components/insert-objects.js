"use client";

import React, { useState } from 'react';
import { insertObjects } from '../services/api-service';

const InsertObjects = () => {
  const [collectionName, setCollectionName] = useState('');
  const [objects, setObjects] = useState([{ name: '', image: '', imageUrl: '', text: '' }]);
  const [message, setMessage] = useState('');

  const handleObjectChange = (index, field, value) => {
    const newObjects = [...objects];
    newObjects[index][field] = value;
    setObjects(newObjects);
  };

  const handleImageChange = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        const imageUrl = reader.result;
        handleObjectChange(index, 'image', base64String);
        handleObjectChange(index, 'imageUrl', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => () => {
    handleObjectChange(index, 'image', '');
    handleObjectChange(index, 'imageUrl', '');
  };

  const addObject = () => {
    setObjects([...objects, { name: '', image: '', imageUrl: '', text: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await insertObjects(collectionName, objects);
      setMessage(result.status);
      // Reset objects array to initial state after successful insert
      setObjects([{ name: '', image: '', imageUrl: '', text: '' }]);
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
    }, 5000);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Insert Objects</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={collectionName} 
          onChange={(e) => setCollectionName(e.target.value)} 
          placeholder="Collection Name" 
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {objects.map((object, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-2 bg-white shadow-sm">
            <input
              type="text"
              value={object.name}
              onChange={(e) => handleObjectChange(index, 'name', e.target.value)}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            {object.imageUrl ? (
              <div className="relative">
                <img src={object.imageUrl} alt="Uploaded" className="w-full h-auto rounded" />
                <button
                  type="button"
                  onClick={removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ) : (
              <input
                type="file"
                onChange={handleImageChange(index)}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            )}
            <input
              type="text"
              value={object.text}
              onChange={(e) => handleObjectChange(index, 'text', e.target.value)}
              placeholder="Text"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
        ))}
        <button type="button" onClick={addObject} className="w-full bg-gray-500 text-white p-2 rounded">
          Add Another Object
        </button>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Insert
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default InsertObjects;
