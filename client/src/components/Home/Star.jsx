import React from "react";

const StarsRating = ({ rating }) => {
  const totalStars = 5; // Total de estrellas posibles
  const filledStars = Math.round(rating); // Redondea la calificación a la estrella más cercana
  return (
    <div className="stars-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <span
          key={index}
          className={` text-3xl ${
            index < filledStars ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarsRating;
