import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path: string, storageValue: string) => {
    setActiveLink(path);
    localStorage.setItem('selectedPage', storageValue);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white h-screen w-64">
      <ul className="flex flex-col">
        <li className="mb-4">
          <Link
            to="/"
            className={`block p-2 rounded ${activeLink === '/' ? 'bg-pink-500' : 'bg-white-500'}`}
            onClick={() => handleLinkClick('/', 'contact')}
          >
            Contacts
          </Link>
        </li>
        <li>
          <Link
            to="/charts-and-maps"
            className={`block p-2 rounded ${activeLink === '/charts-and-maps' ? 'bg-pink-500' : 'bg-white-500'}`}
            onClick={() => handleLinkClick('/charts-and-maps', 'chartsandmaps')}
          >
            Charts and Maps
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
