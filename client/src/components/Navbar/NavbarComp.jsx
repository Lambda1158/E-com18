import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Dropdown from "../Home/Dropdown/Dropdown";
import Form from "./FormSI";
import useModal from "../../hooks/useModal";
import Register from "./Register";

export default function NavbarComp() {
	const { user } = useSelector((state) => state.user);
	const {
	  ventanaRegister,
	  ventanaLogIn,
	  onModalClick,
	  onModaleClick,
	  onModalChange,
	} = useModal();
	return (
	  <nav className="bg-semidark place-content-center items-center py-2">
		<div className="flex items-center justify-between">
		  <Link to="/">
			<img
			  className="flex items-center pl-4"
			  src="http://codes.unidepix.com/img/hi.png"
			  alt="logo hitalent"
			  width="140px"
			/>
		  </Link>
		  {user.username ? (
			<section className="flex p-2 mr-4">
			  <Dropdown />
			  <ShoppingCart />
			</section>
		  ) : (
			<div className="flex mr-4 p-2">
			  <button
				onClick={onModalClick}
				className="m-2 bg-transparent hover:bg-semilight font-semibold hover:text-black py-2 px-4 border border-dark hover:border-semilight rounded"
			  >
				Ingreso
			  </button>
			  <button
				onClick={onModaleClick}
				className="mr-4 m-2 bg-transparent hover:bg-semilight font-semibold hover:text-black py-2 px-4 border border-dark hover:border-semilight rounded"
			  >
				Registro
			  </button>
			  <ShoppingCart />
			</div>
		  )}
		</div>
		{ventanaLogIn && (
		  <Form
			onModalClick={onModalClick}
			onModalChange={onModalChange}
			isOpen={ventanaLogIn}
		  />
		)}
		{ventanaRegister && (
		  <Register
			onModaleClick={onModaleClick}
			onModalChange={onModalChange}
			isOpen={ventanaRegister}
		  />
		)}
	  </nav>
	);
  }
  