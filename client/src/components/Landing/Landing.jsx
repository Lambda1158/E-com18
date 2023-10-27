import React, { useState } from "react";
import { Link } from "react-router-dom";
import Beneficios from "./Beneficios";
import LandingSearchbar from "./LandingSearchbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Form from "../SignIn/FormSI";
import Reseñas from "./Reseñas";
import Register from "../Register/Register";

export default function Landing() {
  const [ventanaLogIn, setVentanaLogIn] = useState(false);
  const [ventanaRegister, setVentanaRegister] = useState(false);

  function onModalClick(e) {
    e.preventDefault();
    setVentanaLogIn(!ventanaLogIn);
  }

  function onModaleClick(e) {
    e.preventDefault();
    setVentanaRegister(!ventanaRegister);
  }

  function onModalChange(e) {
    e.preventDefault();
    setVentanaLogIn(!ventanaLogIn);
    setVentanaRegister(!ventanaRegister);
  }

  return (
    <div className="bg-semilight min-h-screen max-w-full select-none">
      <Navbar onModalClick={onModalClick} onModaleClick={onModaleClick} />
      <div className="flex justify-around items-center content-center bg-landingImg bg-cover min-h-screen object-cover">
        {ventanaLogIn ? (
          <Form onModalClick={onModalClick} onModalChange={onModalChange} />
        ) : (
          console.log("ingreso")
        )}
        {ventanaRegister ? (
          <Register
            ariaHideApp={false}
            onModaleClick={onModaleClick}
            onModalChange={onModalChange}
          />
        ) : (
          console.log("registro")
        )}
        <div className="flex flex-col items-center justify-between bg-dark rounded-md m-7 bg-opacity-70">
          <LandingSearchbar />
          <Link to="/home">
            <button className="font-semibold bg-light rounded-md w-40 p-1 m-3">
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
