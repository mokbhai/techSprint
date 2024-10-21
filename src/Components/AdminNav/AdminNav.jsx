import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNav = ({ setActiveComponent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token or other relevant data from local storage
    navigate('/adminlogin');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold cursor-pointer" onClick={handleGoToDashboard}>Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button onClick={() => setActiveComponent('event')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Events</button>
            <button onClick={() => setActiveComponent('updateEvent')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Update Events</button>
            <button onClick={() => setActiveComponent('contact')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contacts</button>
            <button onClick={() => setActiveComponent('about')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</button>
            <button onClick={() => setActiveComponent('gallery')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Gallery</button>
            <button onClick={() => setActiveComponent('registration')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Registrations</button>
            <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
