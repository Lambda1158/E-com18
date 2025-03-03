import React from "react";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer/Footer";
import Reviews from "./Reviews";
import Spinner from "../Spinner/Spinner";
import NavbarComp from "../Navbar/NavbarComp";
import StarsRating from "../Home/Star";
import useSeeMore from "./hook/useSeemore";
import QandA from "./QandA";
import QandAcard from "./QandACard";
export default function SeeMore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { seemore, addCarrito, user, review, question } = useSeeMore(id);
  function onClick() {
    navigate(-1);
  }
  function onComprar() {
    addCarrito();
    navigate("/cart");
  }
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#ebebeb]">
      <NavbarComp />
      {!seemore.length ? (
        <div className="grid grid-cols-[70%_30%] w-9/12 mx-auto p-4 m-4 border-[1px] bg-white">
          <section>
            <div className="h-[280px] w-11/12  overflow-hidden mx-auto">
              <img
                className="w-full h-full object-cover hover:scale-105 duration-300"
                src={seemore.image}
                alt="talent_image"
              />
            </div>
            <Reviews items={review} />
            <QandA
              isOwner={seemore.user_id === user}
              user_id={user}
              post={{ id: seemore.id, title: seemore.title }}
            >
              <QandAcard items={question} />
            </QandA>
          </section>
          <section className="border-[1px] border-gray-400 shadow-xl cursor-default h-fit">
            <div className="  p-2 py-4 ml-2 ">
              <h1 className="text-4xl font-semibold transform hover:translate-x-6 duration-300 hover:scale-105">
                {seemore.title}
              </h1>
              <h1 className=" text-dark text-3xl italic text-gray-500 transform hover:translate-x-6 duration-300 hover:scale-105 hover:underline">
                by {seemore?.user?.username}
              </h1>
              <StarsRating rating={seemore.rating} />
              <p className="text-green-800 font-semibold text-2xl">
                ${" "}
                {Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "ARS",
                }).format(seemore.cost)}
              </p>
              <p className="italic text-lg mt-2 font-normal border-t-2 border-[#2F5D62] py-2">
                {seemore.description}
              </p>
              <p className=" text-xl font-normal">
                Idioma: <span className="capitalize ">{seemore?.language}</span>
              </p>
              <p className="text-xl font-normal">
                Uso horario: <span>{seemore?.timeZone}</span>
              </p>
              <div className="flex flex-col mt-2 gap-1">
                {seemore.user_id === user ? (
                  <p className=" text-red-600 font-semibold text-lg my-2">
                    Esta publicacion te pertenece!
                  </p>
                ) : (
                  <>
                    <button
                      onClick={onComprar}
                      className="hover:bg-semidark bg-dark text-[#A7C4BC]  font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300"
                    >
                      Comprar
                    </button>
                    <button
                      className="hover:bg-semidark bg-dark text-[#A7C4BC]  font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300"
                      onClick={addCarrito}
                    >
                      Agregar al carrito
                    </button>
                  </>
                )}

                <button
                  onClick={onClick}
                  className="hover:bg-semidark w-full bg-dark text-[#A7C4BC]  font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300"
                >
                  Volver
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
}
