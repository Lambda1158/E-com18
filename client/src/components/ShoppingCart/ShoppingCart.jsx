import React, { useEffect, useId, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { limpearCarrito } from "../../actions/action-talents/carrito";
import { useNavigate } from "react-router-dom";

const useModal = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const [fullHeight, setFullHeight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setFullHeight(true);
      } else {
        setFullHeight(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { modal, toggleModal, fullHeight };
};

const useClickOutside = (modalRef, buttonRef, callback, isActive) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        callback();
      }
    };

    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, modalRef, buttonRef, isActive]);
};

export default function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const cartId = useId();
  const { modal, toggleModal, fullHeight } = useModal();
  useClickOutside(modalRef, buttonRef, toggleModal, modal);
  const limpear = () => {
    dispatch(limpearCarrito());
  };
  const comprar = () => {
    navigate("/cart");
  };
  return (
    <>
      <label
        className=" mt-2 hover:scale-125 transform duration-300 cursor-pointer"
        htmlFor={cartId}
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
      >
        <FaShoppingCart size={35} />
      </label>
      <input ref={buttonRef} id={cartId} hidden type="checkbox"></input>
      <aside
        ref={modalRef}
        className={`border-2 border-gray-950 rounded-sm w-[200px] fixed z-10 right-0 bg-dark p-2 transition-all duration-300 ease-out ${
          modal ? "translate-x-0" : "translate-x-full"
        } ${fullHeight ? "h-full top-0" : "h-[calc(100vh-85px)] top-[87px]"}`}
      >
        <ul className="mt-4 overflow-scroll scrollbar-hide h-[80%]">
          {carrito.map((element) => {
            return (
              <CartItem
                title={element.title}
                quantity={element.quantity}
                key={element.id}
              />
            );
          })}
        </ul>
        <button
          className={`w-[170px] border-2 rounded-xl border-white text-sm font-medium font-sans p-2 hover:bg-semilight hover:text-[#2F5D62] hover:border-[#5E8B7E] fixed bottom-4 left-1/2 transform -translate-x-1/2`}
          onClick={limpear}
        >
          Limpiar
        </button>
        <button
          onClick={comprar}
          className={`w-[170px] border-2 rounded-xl border-white text-sm font-medium font-sans p-2 hover:bg-semilight hover:text-[#2F5D62] hover:border-[#5E8B7E] fixed bottom-16 left-1/2 transform -translate-x-1/2`}
        >
          Ir al Carrito
        </button>
      </aside>
    </>
  );
}
