import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiWalletLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  
} from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation(); // Obtiene la ruta actual
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selected, setSelected] = useState(null); // Maneja la selección

  // Efecto para manejar la selección basada en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelected("home");
      setShowSubMenu(false); // Ocultar submenú si se selecciona algo fuera de él
    } else if (path.startsWith("/Chart")) {
      setSelected("projects");
      setShowSubMenu(false); // Ocultar submenú si se selecciona algo fuera de él
    } else if (path.startsWith("/Citas")) {
      setSelected("Citas");
      setShowSubMenu(true);
    } else if (path.startsWith("/ContratacionAmbulancias")) {
      setSelected("ContratacionAmbulancias");
      setShowSubMenu(true);
    } else if (path.startsWith("/Emergencia")) {
      setSelected("Emergencia");
      setShowSubMenu(true);
    } else if (path.startsWith("/Donaciones")) {
      setSelected("Donaciones");
      setShowSubMenu(true);
    } else if (path.startsWith("/HistorialRegistrado")) {
      setSelected("HistorialRegistrado");
      setShowSubMenu(true);
    } else if (path.startsWith("/PersonalRegistrado")) {
      setSelected("PersonalRegistrado");
      setShowSubMenu(false); // Ocultar submenú si se selecciona algo fuera de él
    } else if (path.startsWith("/SuministrosMedicos")) {
      setSelected("SuministrosMedicos");
      setShowSubMenu(false); // Ocultar submenú si se selecciona algo fuera de él
    } else if (path.startsWith("/UsuariosRegistrados")) {
      setSelected("UsuariosRegistrados");
      setShowSubMenu(false); // Ocultar submenú si se selecciona algo fuera de él
    }
  }, [location]);

  const handleSelect = (item) => {
    setSelected(item);
    if (item !== "submenu") {
      setShowSubMenu(false); // Ocultar submenú al seleccionar un elemento fuera de él
    }
  };

  const handleSubmenuSelect = (item) => {
    setSelected(item);
    setShowSubMenu(false); // Ocultar el menú de submenús cuando se selecciona un submenú
  };

  const toggleSubMenu = () => {
    setShowSubMenu((prev) => !prev);
    if (!showSubMenu) {
      setSelected("submenu");
    } else {
      setSelected(null);
    }
  };

  return (
    <>
      <div
        className={`bg-red-800 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50  duration-800 w-[340px] ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src="https://img.freepik.com/foto-gratis/anciano-sonriente-gafas_23-2148740051.jpg"
            className="w-20 h-20 object-cover rounded-full ring-2 ring-red-300"
          />
          <h1 className="text-xl text-white font-bold">Jorge Luis Trejo</h1>
         
        </div>
        {/* Nav */}
        <div className="bg-red-600 p-8 rounded-tr-[100px] h-[70vh] overflow-y-scroll scrollbar-hide flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <NavLink
              to="/"
              exact
              onClick={() => handleSelect("home")}
              className={` font-bold flex items-center gap-4 py-[3px] px-3 rounded-xl transition-all duration-800  w-[540px] ${
                selected === "home"
                  ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5 "
                  : "text-white hover:bg-red-800"
              }`}
            >
              <img src="https://img.icons8.com/?size=100&id=hmZnke9jb8oq&format=png&color=000000" className="w-8 h-8" />
              Home
            </NavLink>
            <NavLink
              to="/Chart"
              onClick={() => handleSelect("projects")}
              className={` font-bold flex items-center gap-4 py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                selected === "projects"
                  ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5"
                  : "text-white hover:bg-red-800"
              }`}
            >
              <img src="https://img.icons8.com/?size=100&id=aR2Ar4o65ts7&format=png&color=000000" className="w-8 h-8" />
              Projects
            </NavLink>
            {/* Submenu */}
            <div>
          
              <button
              
                onClick={toggleSubMenu}
                className={`font-bold flex items-center justify-between w-full py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                  selected === "submenu"
                    ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5"
                    : "text-white hover:bg-red-800"
                }`}
              >
                
                <span className="flex items-center gap-4">
                  <img src="https://img.icons8.com/?size=100&id=blWgRcjh6QGb&format=png&color=000000" className="w-8 h-8" />
                  Servicios   {showSubMenu ? <RiArrowUpSLine className="text-white" /> : <RiArrowDownSLine  />}
                </span>
              
              </button>
              {showSubMenu && (
                <div className="pl-4 mt-2 flex flex-col gap-2">
                  <NavLink
                    to="/Citas"
                    onClick={() => handleSubmenuSelect("Citas")}
                    className={`font-bold flex items-center py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                      selected === "Citas"
                        ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5 gap-3"
                        : "text-white hover:bg-red-800 gap-3"
                    }`}
                  >
                    <img src="https://img.icons8.com/?size=100&id=12143&format=png&color=000000" className="w-6 h-6" />
                    Citas
                  </NavLink>
                  <NavLink
                    to="/ContratacionAmbulancias"
                    onClick={() => handleSubmenuSelect("ContratacionAmbulancias")}
                    className={`font-bold flex items-center py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                      selected === "ContratacionAmbulancias"
                        ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5 gap-3"
                        : "text-white hover:bg-red-800 gap-3"
                    }`}
                  >
                    <img src="https://img.icons8.com/?size=100&id=12143&format=png&color=000000" className="w-6 h-6" />
                    Contrataciones
                  </NavLink>
                  <NavLink
                    to="/Donaciones"
                    onClick={() => handleSubmenuSelect("Donaciones")}
                    className={`font-bold flex items-center py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                      selected === "Donaciones"
                        ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5 gap-3"
                        : "text-white hover:bg-red-800 gap-3"
                    }`}
                  >
                    <img src="https://img.icons8.com/?size=100&id=12143&format=png&color=000000" className="w-6 h-6" />
                    Donaciones
                  </NavLink>
                  <NavLink
                    to="/Emergencia"
                    onClick={() => handleSubmenuSelect("Emergencia")}
                    className={`font-bold flex items-center py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                      selected === "Emergencia"
                        ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5 gap-3"
                        : "text-white hover:bg-red-800 gap-3"
                    }`}
                  >
                       <img src="https://img.icons8.com/?size=100&id=12143&format=png&color=000000" className="w-6 h-6" />
                    Emergencias
                  </NavLink>
                  <NavLink
                    to="/HistorialRegistrado"
                    onClick={() => handleSubmenuSelect("HistorialRegistrado")}
                    className={`font-bold flex items-center py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                      selected === "HistorialRegistrado"
                        ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5 gap-3"
                        : "text-white hover:bg-red-800 gap-3"
                    }`}
                  >
                       <img src="https://img.icons8.com/?size=100&id=12143&format=png&color=000000" className="w-6 h-6" />
                    Historiales
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              to="/PersonalRegistrado"
              onClick={() => handleSelect("PersonalRegistrado")}
              className={`font-bold flex items-center gap-4 py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                selected === "PersonalRegistrado"
                  ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5"
                  : "text-white hover:bg-red-800"
              }`}
            >
              <img src="https://img.icons8.com/?size=100&id=103978&format=png&color=000000" className="w-8 h-8" />
              Personal
            </NavLink>
            <NavLink
              to="/SuministrosMedicos"
              onClick={() => handleSelect("SuministrosMedicos")}
              className={`font-bold flex items-center gap-4 py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                selected === "SuministrosMedicos"
                  ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5"
                  : "text-white hover:bg-red-800"
              }`}
            >
              <img src="https://img.icons8.com/?size=100&id=103978&format=png&color=000000" className="w-8 h-8" />
              Suministros
            </NavLink>
            <NavLink
              to="/UsuariosRegistrados"
              onClick={() => handleSelect("UsuariosRegistrados")}
              className={`font-bold flex items-center gap-4 py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                selected === "UsuariosRegistrados"
                  ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5"
                  : "text-white hover:bg-red-800"
              }`}
            >
              <img src="https://img.icons8.com/?size=100&id=103978&format=png&color=000000" className="w-8 h-8" />
              Usuarios
            </NavLink>
            <NavLink
              to="/Reports"
              onClick={() => handleSelect("reports")}
              className={`font-bold flex items-center gap-4 py-[3px] px-3 rounded-xl transition-all duration-800 w-[540px] ${
                selected === "reports"
                  ? "bg-red-100 text-red-700 shadow-lg transform translate-x-5"
                  : "text-white hover:bg-red-800"
              }`}
            >
              <img src="https://img.icons8.com/?size=100&id=103978&format=png&color=000000" className="w-8 h-8" />
              Reports
            </NavLink>
          </nav>
          <div className="bg-red-800 text-white p-4 rounded-xl">
            <p className="text-red-300">Having troubles?</p>
            <a href="#">Contact us</a>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-red-700 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;
