import React, { useState } from 'react';

const PhotoGallery = () => {
  const [users, setUsers] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  
  const loadUsers = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data); 
      setCurrentIndex(0); 
    } catch (error) {
      setError('Failed to load data.'); 
    } finally {
      setLoading(false); 
    }
  };

  
  const showNextUser = () => {
    if (users.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length); 
    }
  };

  return (
    <div className="p-8 bg-gray-600 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User Information</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={loadUsers} 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Load Users
        </button>
        {users.length > 0 && (
          <button
            onClick={showNextUser}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Next User
          </button>
        )}
      </div>

     
      {loading && <p className="text-lg font-semibold text-blue-600">Loading...</p>}
      {error && <p className="text-lg font-semibold text-red-600">{error}</p>}

     
      {users.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-700">{users[currentIndex].name[0]}</span>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-800">{users[currentIndex].name}</h2>
              <p className="text-gray-600">Username: {users[currentIndex].username}</p>
              <p className="text-gray-600">Email: {users[currentIndex].email}</p>
              <p className="text-gray-600">Phone: {users[currentIndex].phone}</p>
              <p className="text-gray-600">Website: {users[currentIndex].website}</p>
              <p className="text-gray-600">Company: {users[currentIndex].company.name}</p>
              <p className="text-gray-600">Catch Phrase: {users[currentIndex].company.catchPhrase}</p>
              <p className="text-gray-600">BS: {users[currentIndex].company.bs}</p>
              <p className="text-gray-600">Address Suite: {users[currentIndex].address.suite}</p>
              <p className="text-gray-600">Address Street: {users[currentIndex].address.street}</p>
              <p className="text-gray-600">Address City: {users[currentIndex].address.city}</p>
              <p className="text-gray-600">Address Zipcode: {users[currentIndex].address.zipcode}</p>
              <p className="text-gray-600">Geo Lat: {users[currentIndex].address.geo.lat}</p>
              <p className="text-gray-600">Geo Lng: {users[currentIndex].address.geo.lng}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
