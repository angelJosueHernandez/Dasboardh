import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import { CgFormatSlash } from "react-icons/cg";
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-gray-500 text-xs md:text-sm flex items-center space-x-1">
      <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-red-700">
        <AiFillHome className="w-3 h-3" />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name} className="flex items-center space-x-1">
            <CgFormatSlash className="text-gray-400 w-4 h-4" />
            {isLast ? (
              <span className="text-red-700 font-medium">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-red-700 transition-colors text-gray-600">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
