import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviewbyId } from "../../../actions/index";

export default function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getReviewbyId(id));
  }, [dispatch, id]);
  return (
    <div className="flex flex-col justify-center border-2 text-white border-white rounded-lg w-11/12 pt-4">
      <table>
        <thead>
          <tr>
            <th key={1}>Talento</th>
            <th key={2}>Usuario</th>
            <th key={3}>Puntaje</th>
          </tr>
        </thead>
        <tbody className="bg-semidark rounded-lg">
          {!(review.posts?.length > 0) ? (
            <tr>No tienes publicaciones para obtener reseñas...</tr>
          ) : review.posts[0].reviews.length > 0 ? (
            review.posts.map((e, index) => (
              <tr key={index}>
                <th className="p-2">{e.title}</th>
                <th className="px-2 font-black italic">
                  {e.reviews[0]?.user?.username}
                </th>
                <th>{e.reviews[0]?.qualification}</th>
              </tr>
            ))
          ) : (
            <h1>No tienes reseñas por el momento...</h1>
          )}
        </tbody>
      </table>
    </div>
  );
}
