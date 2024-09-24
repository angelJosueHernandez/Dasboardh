import React, { useState, useRef, useEffect } from "react";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineSetting, AiOutlineMail, AiOutlineLogout } from "react-icons/ai";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import NotFound from '../img/notfound.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Controla el botón del menú
  const [showSearchModal, setShowSearchModal] = useState(false); // Controla el modal de búsqueda en responsive

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const modalRef = useRef(null);

  // Simulación de una función de búsqueda
  const handleSearch = (query) => {
    const sections = ["Inicio", "Nosotros", "Servicios", "Contacto", "Blog", "Donaciones", "Voluntariado"];
    const filteredResults = sections.filter(section => 
      section.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredResults.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }

    setResults(filteredResults);
  };

  const clearSearch = () => {
    setSearchQuery("");  // Limpiar el campo de búsqueda
    setResults([]);      // Limpiar los resultados
    setShowNoResults(false);  // Ocultar el mensaje de "No hay resultados"
  };

  // useEffect para cerrar el menú cuando se haga clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Cierra el menú si el clic está fuera del área
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cerrar el modal de búsqueda cuando se haga clic fuera de él en dispositivos pequeños
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSearchModal(false); // Cierra el modal si el clic está fuera del área
      }
    };
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  // Cerrar el buscador en pantallas grandes si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearSearch(); // Limpia y cierra el buscador
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, []);

  return (
    <>
      <header className="flex items-center justify-between gap-4 p-4 bg-white shadow-lg fixed top-0 left-0 w-full md:left-[16.7%] md:w-[83.4%] z-10">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            <Breadcrumbs />
          </p>
          <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
            <span className="text-red-700">Cruz Roja</span> Huejutla
          </h2>
        </div>

        <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-end">
          {/* Barra de búsqueda normal en pantallas grandes */}
          <div className="hidden md:flex items-center w-full" ref={searchRef}>
            <RiSearch2Line
              className="relative top-2 -translate-y-1/2 left-6 text-gray-400"
              aria-label="Buscar"
              onClick={() => handleSearch(searchQuery)}
            />
            <input
              type="text"
              className="bg-gray-100 outline-none py-1 pl-9 pr-2 rounded-full w-full h-[30px] text-[12px] focus:ring-0 focus:bg-white focus:shadow-lg transition-all duration-300 ease-in-out"
              placeholder="Buscar..."
              aria-label="Buscar..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            {searchQuery && (
              <button
                className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                onClick={clearSearch}
              >
                <RiCloseLine className="text-gray-400" />
              </button>
            )}

            {/* Resultados en pantallas grandes */}
            {results.length > 0 && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 w-[350px] max-h-[140px] overflow-y-auto mt-[190px] transition-all duration-300">
                <p className="px-4 py-2 text-gray-600 font-semibold border-b border-gray-200">Resultados de la búsqueda</p>
                {results.map((result, index) => (
                  <div key={index} className="px-4 py-2 text-gray-700 hover:bg-gray-100 border-b border-gray-100 cursor-pointer transition-all duration-200">
                    {result}
                  </div>
                ))}
              </div>
            )}

            {/* Mensaje "No hay resultados" en pantallas grandes */}
            {showNoResults && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-4 z-50 w-[350px] max-h-56 mt-[190px] transition-all duration-300">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={NotFound} // Ajusta la ruta de la imagen proporcionada
                    alt="No hay resultados"
                    className="w-10 h-10 md:w-14 md:h-14"
                  />
                  <p className="text-gray-500 text-sm md:text-sm mt-4">No hay resultados</p>
                </div>
              </div>
            )}
          </div>

          {/* Ícono de búsqueda solo para móviles */}
          {!showSearchModal && (
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition ml-2 md:hidden"
              onClick={() => setShowSearchModal(true)}
            >
              <RiSearch2Line className="text-gray-400" />
            </button>
          )}

          {/* Botón del menú */}
          <div className="relative" ref={menuRef}>
            <button
              className="ml-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setShowMenu(!showMenu)}
            >
              <AiOutlineUser className="text-gray-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 flex items-center">
                  <AiOutlineUser className="mr-2 text-gray-500" /> 👋 Hey, Adela
                </p>
                <hr />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <AiOutlineSetting className="mr-2 text-gray-500" /> Profile Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <AiOutlineMail className="mr-2 text-gray-500" /> Newsletter Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 flex items-center"
                >
                  <AiOutlineLogout className="mr-2 text-red-500" /> Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal para el buscador en móviles */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-start justify-center p-4 backdrop-blur-sm">
          <div ref={modalRef} className="bg-white rounded-lg p-4 shadow-lg mt-10 w-full max-w-md">
            <div className="relative">
              <RiSearch2Line
                className="absolute top-2 left-6 text-gray-400"
                aria-label="Buscar"
              />
              <input
                type="text"
                className="bg-gray-100 outline-none py-1 pl-[55px] pr-2 rounded-full w-full h-[30px] text-[12px] focus:ring-0 focus:bg-white focus:shadow-lg transition-all duration-300 ease-in-out"
                placeholder="Buscar..."
                aria-label="Buscar..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  onClick={clearSearch}
                >
                  <RiCloseLine className="text-gray-400" />
                </button>
              )}
            </div>

            {/* Modal flotante para mostrar resultados */}
            {results.length > 0 && (
              <div
                className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg py-2 max-h-[200px] overflow-y-auto"
              >
                <p className="px-4 py-2 text-gray-600 font-semibold border-b border-gray-200">Resultados de la búsqueda</p>
                {results.map((result, index) => (
                  <div key={index} className="px-4 py-2 text-gray-700 hover:bg-gray-100 border-b border-gray-100 cursor-pointer transition-all duration-200">
                    {result}
                  </div>
                ))}
              </div>
            )}

            {/* Modal flotante para "No hay resultados" */}
            {showNoResults && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg py-4 flex flex-col items-center justify-center">
                <img
                  src={NotFound} // Ajusta la ruta de la imagen proporcionada
                  alt="No hay resultados"
                  className="w-16 h-16 md:w-24 md:h-24"
                />
                <p className="text-gray-500 text-sm md:text-lg mt-4">No hay resultados</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
