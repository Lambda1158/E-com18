import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Dropdown from "../Home/Dropdown";
export default function Navbar({ onModalClick, onModaleClick }) {
  const { user } = useSelector((state) => state.user);
  return (
    <nav className="bg-semidark place-content-center items-center py-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            className="flex items-center pl-4 "
            src="http://codes.unidepix.com/img/hi.png"
            alt="logo hitalent"
            width="140px"
          />
        </Link>
        {user.username ? (
          <Dropdown />
        ) : (
          <div>
            <button
              onClick={onModalClick}
              className="m-2 bg-transparent hover:bg-semilight  font-semibold hover:text-black py-2 px-4 border border-dark hover:border-semilight rounded p-0"
            >
              Ingreso
            </button>
            <button
              onClick={onModaleClick}
              className="m-2 bg-transparent hover:bg-semilight  font-semibold hover:text-black py-2 px-4 border border-dark hover:border-semilight rounded p-0"
            >
              Registro
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
