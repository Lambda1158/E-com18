import React from "react";
import { IoMdAdd, IoIosRemove } from "react-icons/io";
import {
  agregarCarrito,
  restarCarrito,
  removerCarrito,
} from "../../actions/action-talents/carrito";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navigate = (item) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/talent/" + item.id);
  };
  return onClick;
};
const useAddremoveCarrito = (title) => {
  const dispatch = useDispatch();

  const addCarrito = () => {
    dispatch(agregarCarrito({ title }));
  };
  const restCarrito = () => {
    dispatch(restarCarrito({ title }));
  };
  const removeCarrito = () => {
    dispatch(removerCarrito({ title }));
  };
  return { addCarrito, restCarrito, removeCarrito };
};

export default function ShopItem({ item }) {
  const { title, image, cost, quantity, user } = item;
  const onClick = Navigate(item);
  const { addCarrito, restCarrito, removeCarrito } = useAddremoveCarrito(
    item.title
  );

  return (
    <div className="grid grid-cols-[70%_30%] m-4">
      <section
        onClick={onClick}
        className="hover:scale-105 duration-300 transform ease-in-out cursor-pointer p-4 grid grid-cols-[60%_40%]   border-2"
      >
        <img className="" src={image} alt="Imagen de producto" />
        <div className="ml-4 text-lg font-medium space-y-2">
          <h1 className="text-xl underline">{title}</h1>
          <p>By: {user.username}</p>
          <p className="text-lg font-bold">
            Precio:{" "}
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "ARG",
            }).format(cost)}
          </p>
        </div>
      </section>

      <section className="border-2 p-2 flex flex-col justify-between">
        <div className="flex justify-evenly items-center border-2">
          <IoIosRemove
            onClick={restCarrito}
            className="cursor-pointer text-2xl hover:scale-150 duration-300 transform ease-in-out select-none"
          />
          <p className="select-none text-2xl">{quantity}</p>
          <IoMdAdd
            onClick={addCarrito}
            className="cursor-pointer text-2xl hover:scale-150 duration-300 transform ease-in-out select-none"
          />
        </div>
        <button
          onClick={removeCarrito}
          className="w-full border-2 border-green-900 text-base font-medium font-sans p-2 hover:bg-semilight hover:text-[#2F5D62] hover:border-[#5E8B7E] "
        >
          Eliminar
        </button>
        <div className="text-center">
          <span className=" xxl:text-lg text-base font-bold">
            Subtotal:{" "}
            {Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "ARG",
            }).format(cost * quantity)}
          </span>
        </div>
      </section>
    </div>
  );
}
