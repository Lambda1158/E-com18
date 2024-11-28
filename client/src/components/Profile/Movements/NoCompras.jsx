import React from "react";
import { useNavigate } from "react-router-dom";
export default function NoCompras() {
  const navigate = useNavigate();
  const goToPost = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <div className=" rounded w-full">
        <h2 className="text-3xl font-normal mb-6 cursor-default ">
          Lo siento 😓
        </h2>
        <p className="text-white text-xl mb-4">Perdon no tienes Compras ...</p>
        <button
          onClick={goToPost}
          className="bg-semidark p-2 xxl:w-4/12 rounded  w-6/12 hover:scale-105 duration-300"
        >
          Ve a Comprar algo! 🤠{" "}
        </button>
      </div>
    </div>
  );
}
