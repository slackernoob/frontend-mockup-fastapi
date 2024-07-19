"use client";

import React, { useState } from 'react';
import { nearbySearch } from '../services/api-service';

const Search = () => {
  const [collectionName, setCollectionName] = useState('');
  const [query, setQuery] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        const imageUrl = reader.result;
        setImage(base64String);
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage('');
    setImageUrl('');
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const result = await nearbySearch(collectionName, query, image);
  //     setResults(result.data);
  //     setMessage('');
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setMessage(error.response.data.detail);
  //     } else {
  //       setMessage('An unexpected error occurred');
  //     }
  //     setResults([]);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await nearbySearch(collectionName, query, image);
      console.log(result); // Log the results to check the structure
      if (result && result.length > 0) {
        setResults(result);
        setMessage('');
      } else {
        setMessage('No results found');
        setResults([]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.detail);
      } else {
        setMessage('An unexpected error occurred');
      }
      setResults([]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Search</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={collectionName} 
          onChange={(e) => setCollectionName(e.target.value)} 
          placeholder="Collection Name" 
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        {imageUrl ? (
          <div className="relative">
            <img src={imageUrl} alt="Uploaded" className="w-full h-auto rounded" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
            >
              X
            </button>
          </div>
        ) : (
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        )}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      <div className="mt-6 space-y-4">
        {results.map((result, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            {result.name && <p className="font-semibold text-black">{"Name: " + result.name}</p>}
            {result.b64image && <img src={`data:image/jpeg;base64,${result.b64image}`} alt="Result" className="w-full h-auto rounded" />}
            {result.text && <p className="text-black">{"Text: " + result.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
