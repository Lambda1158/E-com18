import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviewbyId } from "../../../actions/index";

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="border-b-2 text-white border-white shadow-md">
      <h2 className=" underline text-2xl font-semibold tracking-wider text-primary mb-4 shadow-xl w-fit transform hover:scale-110 duration-200">
        Publicaciones
      </h2>
      {user.posts?.length > 0 ? (
        <table className="mb-4 border-2 border-white rounded-lg w-full shadow-xl bg-semidark ">
          <thead>
            <tr className=" border-2 border-white p-4 text-xl">
              <th className="font-medium" key={1}>
                Talento
              </th>
              <th className="font-medium" key={2}>
                Usuario
              </th>
              <th className="font-medium" key={3}>
                Puntaje
              </th>
            </tr>
          </thead>
          <tbody className=" shadow-2xl">
            {review.posts.map((e, index) => (
              <tr className=" border-2 border-white  " key={index}>
                <th className="font-light text-lg border-2">{e.title}</th>
                <th className="font-light text-lg border-2">
                  {e.reviews[0]?.user?.username}
                </th>
                <th className="font-light text-lg">
                  {e.reviews[0]?.qualification}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
