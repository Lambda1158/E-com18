import React, { useState, useEffect } from "react";
import Orders from "./Orders/Orders";
import User from "./User";
import Reviews from "./Reviews/Reviews";
import Movements from "./Movements/Movements";
import Qas from "./QandA/QAs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Nav from "../Profile/Nav";
import Image from "./Image";
import { useParams } from "react-router-dom";
import { getUserbyId } from "../../actions";
import Footer from "../Landing/Footer";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.userSliceReducer.user);

  useEffect(() => {
    dispatch(getUserbyId(id));
  }, [modal, id, dispatch]);

  return (
    <section className=" w-full bg-semilight">
      <Nav />
      <div className="w-screen ">
        {user.length === 0 ? (
          <>
            <h1 className=" w-[90%] text-3xl font-semibold  tracking-normal  transition-all duration-300 ease-in-out text-light hover:tracking-wider">
              No estas registrado, no podes acceder al perfil
            </h1>
            <Footer />
          </>
        ) : (
          <div className="flex flex-row w-full">
            <div className="w-96 mx-6 mt-6">
              <sidebar className="w-1/4">
                <User modal={setModal} />
              </sidebar>
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
      </div>
    </section>
  );
}
