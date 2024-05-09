import React, { useState, useEffect } from "react";
import Orders from "./Orders/Orders";
import User from "./User";
import Reviews from "./Reviews/Reviews";
import Movements from "./Movements/Movements";
import Qas from "./QandA/QAs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../Landing/Navbar";
import Image from "./Image";
import { useParams } from "react-router-dom";
import { getUserbyId } from "../../actions";
import Footer from "../Landing/Footer";
import Form from "../SignIn/FormSI";
import Register from "../Register/Register";
export default function Profile() {
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
  const { id } = useParams();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserbyId(id));
  }, [modal, id, dispatch]);

  return (
    <section className=" h-screen bg-semilight flex flex-col justify-between ">
      <Navbar onModalClick={onModalClick} onModaleClick={onModaleClick} />
      {ventanaLogIn && (
        <Form
          ariaHideApp={false}
          onModalClick={onModalClick}
          onModalChange={onModalChange}
        />
      )}
      {ventanaRegister && (
        <Register
          ariaHideApp={false}
          onModaleClick={onModaleClick}
          onModalChange={onModalChange}
        />
      )}
      {user.length === 0 ? (
        <>
          <h1 className=" text-3xl font-normal ml-[30%]  tracking-normal  transition-all duration-300 ease-in-out text-light hover:tracking-wider">
            No estas registrado, no podes acceder al perfil
          </h1>
          <Footer />
        </>
      ) : (
        <div className="flex flex-row w-full">
          <div className="w-96 mx-6 mt-6 mb-20">
            <aside className=" w-[300px]">
              <User modal={setModal} />
            </aside>
          </div>
          <Image modal={modal} isModal={setModal} ariaHideApp={false} />
          <div className="flex flex-col mt-6 mx-6 w-full space-y-4">
            <section className="space-y-4">
              <section>
                <h2 className="text-2xl font-medium pl-4">Compras</h2>
                <Orders />
              </section>
              <section>
                <h2 className="text-2xl font-medium pl-4">Ventas</h2>
                <Movements />
              </section>
              <section>
                <h2 className="text-2xl font-medium pl-4">Reseñas</h2>
                <Reviews />
              </section>
              <section>
                <h2 className="text-2xl font-medium pl-4">Preguntas</h2>
                <Qas />
              </section>
            </section>
            <div className="flex justify-center">
              <Link to="/home">
                <button className="btn-custom btn-colors">Volver</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
