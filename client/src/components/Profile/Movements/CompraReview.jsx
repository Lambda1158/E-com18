import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { postNewReview } from "../../../actions/action-talents/review";
import { useDispatch } from "react-redux";

export default function ReviewForm({ post, user }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Por favor, selecciona una calificación y escribe un comentario.");
      return;
    }
    dispatch(postNewReview({ rating, comment, post, user }));
    setRating(0);
    setComment("");
  };

  return (
    <section className="px-2">
      <form onSubmit={handleOnSubmit} className=" space-y-2">
        <h1 className="font-semibold text-lg text-white">Dejanos tu Review!</h1>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaRegStar
              key={star}
              size={22}
              color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="cursor-pointer"
            />
          ))}
        </div>
        <input
          className="px-2 py-1 border-[1px] border-gray-600 w-full text-black rounded-md"
          placeholder="Escribe tu comentario..."
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button
          className="block w-full p-2 bg-green-600 rounded my-2 hover:bg-green-700 text-white"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
