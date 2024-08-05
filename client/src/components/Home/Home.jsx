import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer";
import TalentCard from "./TalentCard";
import { getTalents } from "../../actions";
import Form from "../SignIn/FormSI";
import Register from "../Register/Register";
import { SortByPrice } from "../Sort/SortByPrice";
import Spinner from "../Spinner/Spinner";
import { SortByCategorie } from "../Sort/SortByCategorie";
import SimpleSlider from "./SimpleSlider";
export default function Home() {
  let skill = useSelector((state) => state.mislice.filteredTalents);
  //let skillAprobados = skill.filter(el => el.aprobado === true);
  const cargando = useSelector((state) => state.cargando);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTalents());
  }, [dispatch]);
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
    <div className="flex min-h-screen flex-col">
      <Navbar
        onModalChange={onModalChange}
        onModaleClick={onModaleClick}
        onModalClick={onModalClick}
      />

      <div>
        {ventanaLogIn && (
          <Form onModalClick={onModalClick} onModalChange={onModalChange} />
        )}
        {ventanaRegister && (
          <Register
            onModaleClick={onModaleClick}
            onModalChange={onModalChange}
          />
        )}
      </div>

      <h2 className="text-4xl text-center p-2 font-semibold underline underline-offset-4 text-[#2F5D62]">
        ¡Aventurate al desafio de enseñar y aprender nuevos talentos!
      </h2>
      <div className="flex justify-center space-x-10 font-semibold text-xl mt-4">
        <SortByCategorie />
        <SortByPrice />
      </div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          {skill?.length === 0 ? (
            <div className="text-4xl h-[300px] mt-10 flex-grow font-semibold text-[#2F5D62]  m-4 w-full">
              <h1 className="text-center">
                Ups! no encontramos lo que buscas, intenta de nuevo
              </h1>
            </div>
          ) : (

			<SimpleSlider items={skill}>
			</SimpleSlider>

       
          )}
        </>
      )}
      <Footer />
    </div>
  );
}
