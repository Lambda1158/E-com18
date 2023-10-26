import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { searchTalent } from "../../actions";
import Searchbar from "../Searchbar/Searchbar";

export default function Nav({ onModalClick, onModaleClick, onModalChange }) {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  let usuario = useSelector((state) => state.userSliceReducer.user);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchTalent(state));
  }

  function onChange(e) {
    e.preventDefault();
    setState(e.target.value);
  }

  return (
    <nav className="bg-semidark">
      <div className="flex justify-between items-center py-1">
        <Link to="/">
          <img
            className="flex items-center pl-4"
            src="http://codes.unidepix.com/img/hi.png"
            alt="logo hitalent"
            width="140px"
          />
        </Link>
        {/* <div className="flex">
          <form onSubmit={onSubmit}>
            <div className="searchbar-inner bg-gray-200">
              <div className="searchbar-input-wrap container flex justify-center items-center px-4 sm:px-6 lg:px-8">
                <input
                  onChange={onChange}
                  type="search"
                  className="h-10 w-64 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
                  placeholder="Prueba con 'yoga'"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 pl-1 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div> */}
        <Searchbar />
        {usuario.length === 0 ? (
          <div>
            <button
              onClick={onModalClick}
              className="m-2  bg-transparent hover:bg-semilight  font-semibold hover:text-black py-2 px-4 border  hover:border-semilight rounded p-0"
            >
              Ingreso
            </button>
            <button
              onClick={onModaleClick}
              className="m-2 bg-transparent hover:bg-semilight  font-semibold hover:text-black py-2 px-4 border hover:border-semilight rounded p-0"
            >
              Registro
            </button>
          </div>
        ) : usuario.isAdmin ? (
          <Link to="/admin">
            <button className="m-4 font-semibold">
              Volver al panel de Administrador
            </button>
          </Link>
        ) : (
          <Dropdown />
        )}
      </div>
    </nav>
  );
}
