import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
   

  return (
    <nav className="bg-gray-800 p-4">
      <div className="text-white text-center text-lg">
        {location.pathname==="/"?"Contact":"Chart And Map"}
      </div>
    </nav>
  );
};

export default Navbar;
