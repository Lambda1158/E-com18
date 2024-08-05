import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviewbyId } from "../../../actions/index";

export default function Publicaciones() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="border-b-2 text-white border-white shadow-md">
      <h2 className=" underline text-2xl font-semibold tracking-wider text-primary mb-4 shadow-xl w-fit transform hover:scale-110 duration-200">
        Publicaciones
      </h2>
      {user.posts?.length > 0 ? (
        <div>aca van los post para editar</div>
      ) : (
        <div className=" bg-semidark p-8 rounded shadow-xl w-full">
          <h2 className="text-3xl font-medium text-white mb-4">Lo siento 😓</h2>
          <p className="text-white text-xl">
            Perdon no tienes Reseñas sobre tus post ...
          </p>
        </div>
      )}
    </div>
  );
}
