import React from "react";

const StarsRating = ({ rating, props }) => {
  const totalStars = 5;
  return (
    <div className={props}>
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
