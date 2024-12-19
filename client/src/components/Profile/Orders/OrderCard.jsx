import React from "react";
export default function OrderCard({ element }) {
  console.log(element);
  return (
    <div className="bg-dark text-white border rounded-lg shadow-lg p-4 min-w-[360px] cursor-default select-none">
      <h3 className="text-xl font-bold mb-2">{element.title}</h3>
      <p className="text-gray-400 text-sm mb-4">
        Compra realizada el:{" "}
        <span className="text-white">
          {new Date(element.createdAt).toLocaleDateString()}
        </span>
      </p>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full border mr-4"
          src={element.user.image}
          alt={`Foto de perfil de ${element.user.name}`}
        />
        <div>
          <h4 className="font-semibold">{element.user.name}</h4>
          <p className="text-gray-400 text-sm">{element.user.email}</p>
          <p className="text-gray-400 text-sm">{element.user.country}</p>
        </div>
      </div>
      <div className="mb-2">
        <h4 className="font-semibold text-lg">
          Detalles del post:{" "}
          <span className=" text-xl font-normal">{element.post.title}</span>
        </h4>
        <p className="text-sm italic text-gray-400">
          {element.post.description}
        </p>
        <p className="text-sm text-gray-400">
          Costo original: ${element.post.cost}
        </p>
        <p className="text-lg text-gray-400">Rating: ⭐{element.post.rating}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          Estado:{" "}
          <span className="text-yellow-400 capitalize">{element.status}</span>
        </p>
        <p className="font-bold text-lg">
          Total:{" "}
          <span className="text-green-400">
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "ARS",
            }).format(element.price)}
          </span>
        </p>
      </div>
    </div>
   
  );
}
