import React, { useState, useEffect } from "react";
import Orders from "./Orders/Orders";
import User from "./User";
import Reviews from "./Reviews/Reviews";
import Movements from "./Movements/Movements";
import Qas from "./QandA/QAs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Image from "./Image";
import { useParams } from "react-router-dom";
import { getUserbyId } from "../../actions/action-talents/user.js";
import Footer from "../Landing/Footer";
import Publicaciones from "./Publicaciones/Publicaciones.jsx";
import NavbarComp from "../Navbar/NavbarComp.jsx";
export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserbyId(id));
    document.body.style.overflow = modal ? "hidden" : "unset";
  }, [modal, id, dispatch]);
  return (
    <section className=" h-full bg-semilight flex flex-col justify-between w-full ">
		<NavbarComp/>
      {user.length === 0 ? (
        <>
          <h1 className=" text-3xl font-normal ml-[30%]  tracking-normal  transition-all duration-300 ease-in-out text-light hover:tracking-wider">
            No estas registrado, no podes acceder al perfil
          </h1>
          <Footer />
        </>
      ) : (
        <div className="flex w-full">
          <div className=" mx-4 mt-6 mb-20">
            <User modal={setModal} />
          </div>
          <Image modal={modal} isModal={setModal} ariaHideApp={false} />
          <div className="flex flex-col mt-6 mx-6 w-full space-y-4">
            <section className="space-y-4">
              <Movements />
              <Orders />
              <Publicaciones />
              <Reviews />
              <Qas />
            </section>
            <div className="flex justify-center"></div>
          </div>
        </div>
      )}
    </section>
  );
}
