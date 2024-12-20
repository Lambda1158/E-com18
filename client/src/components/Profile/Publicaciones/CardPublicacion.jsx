import React from "react";
import StarsRating from "../../Home/Star";
import ModalEliminar from "./modalEliminar";
import { usePublicacion } from "./hook/usePublicacion";
export default function CardPublicacion({ element }) {
  const {
    editMode,
    toggleEdit,
    handleSubmit,
    borrarTalento,
    state,
    eliminarModal,
    toggleEliminar,
  } = usePublicacion(element);
  return (
    <div className="border rounded-lg p-4 cursor-default max-w-[370px]  min-w-[370px]">
      <form onSubmit={handleSubmit}>
        {!editMode ? (
          <>
            <div className="flex justify-normal items-center">
              <img
                className="w-12 h-12 rounded-full border mr-4"
                alt={element.title}
                src={element.image[0]}
              />
              <h2 className="font-semibold text-xl">Título: {element.title}</h2>
            </div>
            <div>
              <h4 className="inline">Descripcion:</h4>
              <p className="inline  italic"> {element.description}</p>
              <p className="text-gray-300">
                Costo:{" "}
                <span className="text-green-400">
                  {Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "ARS",
                  }).format(element.cost)}
                </span>
              </p>
              <p className="text-gray-300">
                Duración:{" "}
                <span className="font-bold">{element.duration} hrs</span>
              </p>
              <div className="flex items-center gap-1">
                <p className="">Rating: </p>
                <StarsRating rating={element.rating} />
              </div>
            </div>
          </>
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
                step="0.01"
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
        <div className="flex space-x-4 mt-2">
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
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white border-2 font-medium py-2 rounded transition-colors duration-300"
              >
                Cancelar
              </button>
            </>
          )}
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
