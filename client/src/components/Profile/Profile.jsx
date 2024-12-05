import React from "react";
import Orders from "./Orders/Orders";
import User from "./User";
import Reviews from "./Reviews/Reviews";
import Movements from "./Movements/Movements";
import Qas from "./QandA/QAs";
import Image from "./Image";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Publicaciones from "./Publicaciones/Publicaciones.jsx";
import NavbarComp from "../Navbar/NavbarComp.jsx";
import useProfile from "./hook/useProfile.js";
import useModalProfile from "./hook/useModalProfile.js";
export default function Profile() {
  const { id } = useParams();
  const { user, sales, orders, talentosUsuario, review, qa } = useProfile(id);
  const { modal, toogleModal } = useModalProfile();
  return (
    <section className=" bg-semilight flex flex-col justify-between w-full ">
      <NavbarComp />
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
            <User modal={toogleModal} />
          </div>
          <Image
            user={user.username}
            modal={modal}
            isModal={toogleModal}
            ariaHideApp={false}
          />
          <div className="my-6 mx-4 space-y-10 overflow-x-auto">
            <Movements sales={sales} />
            <Orders orders={orders} />
            <Publicaciones talentosUsuario={talentosUsuario} />
            <Reviews review={review} />
            <Qas qa={qa} />
          </div>
        </div>
      )}
    </section>
  );
}
