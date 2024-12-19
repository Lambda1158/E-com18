import React from "react";
import CompraReview from "./CompraReview";
const CompraCard = ({ purchase }) => {
  const { price, status, createdAt, post } = purchase;
  return (
    <div className="bg-dark text-white border rounded-lg shadow-lg p-4 xxl:w-[330px] ">
      <div>
        <h3 className="text-xl font-semibold text-center mb-2">{post.title}</h3>
        <img
          alt="imagen-talento"
          className="h-32 mx-auto rounded-lg object-cover xxl:w-full"
          src={post.image}
        />
      </div>
      <div className=" py-2 px-2 text-sm text-gray-400">
        <h4 className="font-semibold text-lg text-white">
          Detalles de la Compra:
        </h4>
        <p>
          Compra realizada el:{" "}
          <span className="text-white">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </p>
        <p>
          Costo Actual:{" "}
          <span className="text-white">
            ${" "}
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "ARS",
            }).format(post.cost)}
          </span>
        </p>
        <p>
          Comprada por:{" "}
          <span className="text-green-400">
            $
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "ARS",
            }).format(price)}
          </span>
        </p>
        <p>
          Estado: <span className="text-yellow-400 capitalize">{status}</span>
        </p>
      </div>
      {!post.reviews?.length ? (
        <CompraReview post={purchase.postId} user={purchase.userId} />
      ) : (
        <h1 className="px-2 font-semibold text-lg text-white">
          Ya dejaste una Review!
        </h1>
      )}
    </div>
  );
};

export default CompraCard;
