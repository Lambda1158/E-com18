import React from "react";
import StarsRating from "../../Home/Star";
export default function ReviewCard({ review }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg w-80 flex flex-col gap-3 text-white cursor-default hover:scale-105 duration-300">
      <div className="flex items-center gap-3">
        <img
          src={review.user.image}
          alt={review.user.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className=" font-medium">{review.user.username}</p>
          <p className="underline text-gray-500">{review.user.email}</p>
        </div>
      </div>
      <div className="text-sm">
        <div className="flex items-center gap-1">
          <p className="mt-1 font-bold">Calificación:</p>
          <StarsRating rating={review.qualification} />
        </div>
        <p className="font-bold inline">Comentario sobre {review.post.title}</p>{" "}
        <p className="italic">{review.description}</p>
        <p className="font-bold">
          Estado:{" "}
          <span
            className={`${review.aprobado ? "text-green-600" : "text-red-600"}`}
          >
            {review.aprobado ? "Aprobada" : "Pendiente"}
          </span>
        </p>
        <p className="italic text-gray-400">
          Creada el: {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
