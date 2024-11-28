import React from "react";
import StarsRating from "../../Home/Star";
import ModalEliminar from "./modalEliminar";
import { usePublicacion } from "./hook/usePublicacion";
export default function CardPublicacion({ element }) {
  const { editMode, toggleEdit, handleSubmit, borrarTalento,state, eliminarModal, toggleEliminar } =
    usePublicacion(element);
  return (
    <div className="border rounded-lg shadow-lg p-4 w-3/12 hover:scale-105 transition-transform duration-300 cursor-default">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center space-y-4">
          <img
            className="w-11/12 h-[150px] object-cover rounded-md"
            alt={element.title}
            src={element.image[0]}
          />
          <StarsRating rating={element.rating} />
          {!editMode ? (
            <div className="text-center space-y-1">
              <p className="font-semibold text-lg">Título: {element.title}</p>
              <p className="text-gray-300">Costo: ${element.cost}</p>
              <p className="text-gray-300">Duración: {element.duration} hrs</p>
            </div>
          ) : (
            <div className="space-y-3 w-full">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Título:</label>
                <input
                  name="title"
                  className="border text-black rounded px-3 py-2 text-sm focus:outline-primary"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Costo:</label>
                <input
                  name="cost"
                  type="number"
                  className="border text-black rounded px-3 py-2 text-sm focus:outline-primary"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  Duración (hrs):
                </label>
                <input
                  name="duration"
                  type="number"
                  className="border text-black rounded px-3 py-2 text-sm focus:outline-primary"
                />
              </div>
            </div>
          )}

          <div className="flex space-x-2 w-full">
            {!editMode ? (
              <>
                <button
                  type="button"
                  onClick={toggleEdit}
                  key={"editar"}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition-colors duration-300"
                >
                  Editar
                </button>
                <button
                  type="button"
                  key={"eliminar"}
                  onClick={toggleEliminar}
                  className="w-full bg-red hover:bg-rose-950 text-white font-medium py-2 rounded transition-colors duration-300"
                >
                  Eliminar
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  key={"guardar"}
                  className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded transition-colors duration-300"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  key={"cancelar"}
                  onClick={toggleEdit}
                  className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded transition-colors duration-300"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
        {state.error && <p>{state.message}</p>}
      </form>
      <ModalEliminar
        error={state.error}
        state={eliminarModal}
        toggle={toggleEliminar}
        borrar={borrarTalento}
      />
    </div>
  );
}
