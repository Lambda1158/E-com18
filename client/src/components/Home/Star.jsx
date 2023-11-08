import React from "react";

const StarsRating = ({ rating }) => {
  const totalStars = 5; // Total de estrellas posibles
  return (
    <div className="stars-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <span
          key={index}
          className={` text-3xl ${
            index < rating ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarsRating;
