import React from "react";

const CompraCard = ({ purchase }) => {
  const { id, title, price, status, createdAt, user, post } = purchase;

  return (
    <div className="bg-dark text-white border rounded-lg shadow-lg p-4 w-full sm:w-96">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">
        Compra realizada el:{" "}
        <span className="text-white">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </p>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full border mr-4"
          src={user.image}
          alt={`Foto de perfil de ${user.name}`}
        />
        <div>
          <h4 className="font-semibold">{user.name}</h4>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <p className="text-gray-400 text-sm">{user.country}</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-lg">Detalles del post:</h4>
        <p className="text-gray-400">{post.title}</p>
        <p className="text-sm text-gray-400">{post.description}</p>
        <p className="text-sm text-gray-400">Costo original: ${post.cost}</p>
        <p className="text-sm text-gray-400">Rating: ⭐{post.rating}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          Estado: <span className="text-yellow-400 capitalize">{status}</span>
        </p>
        <p className="font-bold text-lg">
          Total:
          <span className="text-green-400">
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CompraCard;
