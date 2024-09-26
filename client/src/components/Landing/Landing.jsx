import React from "react";
import { Link } from "react-router-dom";
import Beneficios from "./Beneficios";
import LandingSearchbar from "./LandingSearchbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Form from "../SignIn/FormSI";
import Reseñas from "./Reseñas";
import Register from "../Register/Register";
import useModal from "../../hooks/useModal";

export default function Landing() {
  const {
    ventanaRegister,
    ventanaLogIn,
    onModalClick,
    onModaleClick,
    onModalChange,
  } = useModal();

  return (
    <div className="bg-semilight min-h-screen max-w-full overflow-x-hidden">
      <Navbar onModalClick={onModalClick} onModaleClick={onModaleClick} />
      <div className="flex justify-around items-center content-center bg-landingImg bg-cover min-h-screen object-cover">
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
        <div className="flex flex-col items-center justify-between bg-dark rounded-md m-7 bg-opacity-70">
          <LandingSearchbar />
          <Link to="/home">
            <button className="font-semibold bg-light rounded-md w-40 p-1 m-3 hover:scale-105 transform duration-100 hover:bg-semilight">
              Ir al sitio
            </button>
          </Link>
        </div>
      </div>
      <Beneficios />
      <Reseñas />
      <Footer />
    </div>
  );
}
