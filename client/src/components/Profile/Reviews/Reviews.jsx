import React from "react";
import ReviewCard from "./ReviewCard";
export default function Reviews({ review }) {
  if (review.message || !review.length) return null;
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <h2 className=" text-3xl font-normal mb-4 cursor-default">Reseñas</h2>
      <div className="flex flex-wrap gap-6 p-4 overflow-auto">
        {review.map((element) => {
          return <ReviewCard key={element.id} review={element} />;
        })}
      </div>
    </div>
  );
}
