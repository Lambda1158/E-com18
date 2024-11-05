import React from "react";
import { IoMdAdd, IoIosRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  agregarCarrito,
  restarCarrito,
} from "../../actions/action-talents/carrito";

export default function CartItem({ title, quantity }) {
  const dispatch = useDispatch();
  const addCarrito = () => {
    dispatch(agregarCarrito({ title }));
  };
  const restCarrito = () => {
    dispatch(restarCarrito({ title }));
  };
  return (
    <div className="font-medium border-2 border-white rounded-md p-2 mx-2 mb-4 hover:shadow-lg hover:scale-105 duration-300 ease-in-out">
      <p className=" text-center text-white">{title}</p>
      <div className="flex justify-around mt-2">
        <IoIosRemove
          onClick={restCarrito}
          className=" cursor-pointer text-2xl hover:scale-150 duration-300 transform ease-in-out select-none"
        />
        <p className="text-white select-none">{quantity}</p>
        <IoMdAdd
          onClick={addCarrito}
          className="cursor-pointer text-2xl hover:scale-150 duration-300 transform ease-in-out select-none"
        />
      </div>
    </div>
  );
}
