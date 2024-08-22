import React, { useState } from "react";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-4 p-4 bg-white shadow-lg fixed top-0 left-0 w-full md:left-[16.7%] md:w-[82%] z-10">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            <Breadcrumbs />
          </p>
          <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
            <span className="text-red-700">Cruz Roja</span> Huejutla
          </h2>
        </div>

        <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-end">
          {/* Mostrar botón de búsqueda solo en modo responsive */}
          {!showSearch && (
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition ml-2 md:hidden"
              onClick={() => setShowSearch(true)}
            >
              <RiSearch2Line className="text-gray-400 " />
            </button>
          )}

          {/* Mostrar barra de búsqueda en modo normal */}
          <div className="hidden md:flex items-center">
            <RiSearch2Line
              className="relative top-2 -translate-y-1/2 left-6 text-gray-400"
              aria-label="Buscar"
            />
            <input
              type="text"
              className="bg-gray-100 outline-none py-1 pl-9 pr-2 rounded-full w-[160px] h-[30px] text-[12px] focus:ring-0 focus:bg-white focus:shadow-lg transition-all duration-300 ease-in-out"
              placeholder="Buscar..."
              aria-label="Buscar..."
            />
          </div>

          {/* Modal de búsqueda en modo responsive */}
          {showSearch && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-start justify-center z-50 p-4 md:hidden">
              <div className="bg-white rounded-lg p-4 shadow-lg mt-10 flex items-center">
                <RiSearch2Line
                  className="relative top-2 -translate-y-1/2 left-6 text-gray-400"
                  aria-label="Buscar"
                />
                <input
                  type="text"
                  className="bg-gray-100 outline-none py-1 pl-8 pr-2 rounded-full w-[160px] h-[30px] text-[12px] focus:ring-0 focus:bg-white focus:shadow-lg transition-all duration-300 ease-in-out"
                  placeholder="Buscar..."
                  aria-label="Buscar..."
                />
                <button
                  className="ml-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  onClick={() => setShowSearch(false)}
                >
                  <RiCloseLine className="text-gray-400" />
                </button>
              </div>
            </div>
          )}

          {/* Menu */}
          <div className="relative">
            <button
              className="ml-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setShowMenu(!showMenu)}
            >
              <AiOutlineUser className="text-gray-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700">👋 Hey, Adela</p>
                <hr />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Newsletter Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                >
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
