import React from "react";
import { useNavigate } from "react-router-dom";
export default function TalentCard({
  title,
  username,
  image,
  cost,
  id,
  category,
  rating,
  duration,
}) {
  const navigate = useNavigate();
  const clickTalent = () => {
    navigate("/talent/" + id);
  };
  return (
    <div className="px-2 shadow-2xl py-4">
      <div
        onClick={clickTalent}
        className=" rounded-lg shadow-lg border-[1px] border-gray-200 overflow-hidden bg-white text-gray-800 mt-4 max-w-[330px] hover:scale-105 duration-300 cursor-pointer"
      >
        <img
          className="h-[150px] w-full object-cover"
          src={image}
          alt="talent_image"
        />
        <div className="p-4">
          <h1 className="text-xl font-normal text-gray-900">{title}</h1>
          <h2 className="italic underline text-sm font-light text-gray-600">
            By: {username}
          </h2>
          <p className="text-sm font-normal text-gray-900 truncate ">
            Categoría: {category}
          </p>
          <h2>Duracion: {duration}hs</h2>
          <p className="text-green-800 font-bold">
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "ARS",
            }).format(cost)}
          </p>
        </div>
      </div>
    </div>
  );
}
