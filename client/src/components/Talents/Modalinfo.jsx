import React from "react";
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { clearError } from "../../actions/statereducer";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
export default function Modalinfo({ error, cargando, toggleModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buscarButton = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };
  const volverButton = () => {
    dispatch(clearError());
    toggleModal();
  };
  if (cargando) {
    return <Spinner />;
  }
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 bg-black w-screen h-screen bg-opacity-90 flex justify-center items-center ">
      {error.error ? (
        <div className="w-2/5 h-6/12 bg-slate-300 p-2 hover:scale-105 duration-300">
          <h1 className=" text-3xl tracking-wide font-semibold text-center mt-2">
            Lo Siento 😥{" "}
          </h1>
          <div className="text-center p-4">
            <p className="text-xl inline-flex ">
              Tu post no se pudo crear debido a:{" "}
            </p>
            <span className="text-xl underline">{error.message}</span>
          </div>
          <button
            className=" w-11/12 block mx-auto bg-slate-700 p-2 hover:bg-slate-500 hover:text-white transform duration-300 hover:scale-105"
            onClick={volverButton}
          >
            Volver
          </button>
        </div>
      ) : (
        <div className="w-2/5 h-6/12 bg-slate-300 p-2 hover:scale-105 duration-300">
          <h1 className=" text-3xl tracking-wide font-semibold text-center mt-2">
            Enorabuena!!!! 🎊{" "}
          </h1>
          <p className="text-2xl p-2 font-medium text-center m-2">
            Tu Post se creo con exito!
          </p>
          <button
            className=" w-11/12 block mx-auto bg-slate-700 p-2 hover:bg-slate-500 hover:text-white transform duration-300 hover:scale-105"
            onClick={buscarButton}
          >
            Ir a buscarlo
          </button>
        </div>
      )}
    </div>,
    document.getElementById("portal")
  );
}
