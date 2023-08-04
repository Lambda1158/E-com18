import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { cargarUsuario } from "../../actions";
import { useDispatch } from "react-redux";

export default function Nav() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(cargarUsuario([]));
    navigate("/");
  };

  return (
    <nav class="bg-semidark">
      <div class="flex justify-between items-center py-1">
        <img
          className="flex items-center pl-4"
          src="http://codes.unidepix.com/img/hi.png"
          alt="logo hitalent"
          width="140px"
          alt="hitalent logo"
        />
        <Link to="/home">
          <button class="m-4 font-semibold">Home</button>
        </Link>
        <button
          onClick={(e) => logOut(e)}
          class="m-2 bg-transparent hover:bg-semilight  font-semibold hover:text-black py-2 px-4 border border-dark hover:border-semilight rounded p-0"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
