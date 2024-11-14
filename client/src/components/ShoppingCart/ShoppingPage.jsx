import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import ShopItem from "./ShopItem";
import Resume from "./Resume";

export default function SeeMore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carrito = useSelector((state) => state.cart);
  const onClick = () => {
    navigate("/home");
  };
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavbarComp />
      {carrito.length !== 0 ? (
        <div className=" text-[#2F5D62] grid grid-cols-[70%_30%] gap-4 w-4/5 mx-auto p-8 ">
          <section className=" shadow-2xl">
            {carrito.map((element) => {
              return <ShopItem key={element.id} item={element} />;
            })}
          </section>
          <Resume carrito={carrito} />
        </div>
      ) : (
        <div className=" w-4/5 mx-auto flex flex-col items-center ">
          <p className=" text-4xl font-normal mb-10 ">
            Lo siento el carrito esta vacio! 🛍
          </p>
          <button
            onClick={onClick}
            className=" w-[170px] border-2 rounded-xl border-green-900 text-sm font-medium font-sans p-2 hover:bg-semilight hover:text-[#2F5D62] hover:border-[#5E8B7E]"
          >
            Take me back
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
