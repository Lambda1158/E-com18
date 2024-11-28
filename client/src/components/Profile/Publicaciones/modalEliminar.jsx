import React from "react";
import ReactDOM from "react-dom";
export default function ModalEliminar({ toggle, state, borrar }) {
  if (!state) return null;
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 bg-black w-screen h-screen bg-opacity-90 flex justify-center items-center ">
      <div className="w-2/5 h-6/12 bg-slate-300 p-2 hover:scale-105 duration-300">
        <h1 className=" text-3xl tracking-wide font-semibold text-center mt-2 p-2">
          Estas seguro de que quieres eliminar esta publicacion?
        </h1>
        <p className="text-2xl p-2 font-medium text-center m-2">
          Se eliminara permanentemente!
        </p>
        <div className="flex gap-2 m-2 p-2 text-lg font-semibold">
          <button
            onClick={toggle}
            className=" w-11/12 block mx-auto bg-slate-700 p-2 hover:bg-slate-500 hover:text-white transform duration-300 hover:scale-105"
          >
            Volver
          </button>
          <button
            onClick={borrar}
            className=" w-11/12 block mx-auto bg-red p-2 hover:bg-rose-950 hover:text-white transform duration-300 hover:scale-105"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
