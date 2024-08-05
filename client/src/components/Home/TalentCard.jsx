import React from "react";
import { Link } from "react-router-dom";
import StarsRating from "./Star";

export default function TalentCard({
  title,
  username,
  description,
  image,
  cost,
  id,
  category,
  rating,
  reviews,
}) {
  return (
    <div className=" border-[1px] border-gray-500 mt-2 ">
      <img className=" h-[200px] w-[400px]"
        src={image}
        alt="talent_image"
      />
      <div>
        <h1 className=" font-semibold text-1xl mb-1">By: {username}</h1>
        <h2 className="text-sm font-semibold py-1">Categoria: {category}</h2>
        <h1 className=" font-semibold text-1xl py-1 underline">{title}</h1>
        <span className=" block h-[90px] w-fit overflow-y-auto font-normal ">
          {description}
        </span>
        <h2 className=" font-bold mt-1">${cost}</h2>
        <StarsRating rating={rating} />
		<h2 className=" font-semibold mb-2">Comentarios:</h2>
        {reviews?.map((e, index) => {
          return (
            <p className="text-sm font-medium px-1 w-fit" key={index}>
              {e.description}
            </p>
          );
        })}
        <div className="mt-1 w-fit">
          <Link to={"/talent/" + id}>
            <button className="ml-2 font-semibold  transform ease-out duration-300 transition-transform hover:underline hover:scale-105">
              Ver mas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
