import React, { useEffect, useState } from "react";
import { PROXY } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTalentById } from "../../actions";
import Footer from "../Landing/Footer";
import { Link } from "react-router-dom";
import QyA from "./Q&A";
import QyAanswer from "./Q&Aanswer";
import Reviews from "./Reviews";
import axios from "axios";
import { addToCart } from "../../actions/shoppingActions";
import Spinner from "../Spinner/Spinner";
import Form from "../SignIn/FormSI";
import Register from "../Register/Register";
import Navbar from "../Landing/Navbar";

export default function SeeMore() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const seemore = useSelector((state) => state.mislice.moreTalent);
  const { user } = useSelector((state) => state.user);
  let payloadMp = {
    items: [{ title: seemore.title, unit_price: seemore.cost, quantity: 1 }],
  };

  useEffect(() => {
    dispatch(getTalentById(id));
  }, [dispatch, id]);

  async function handleCheckOut(e) {
    let payloadOrder = {
      carrito: [
        {
          title: seemore.title,
          price: seemore.cost,
          quantity: 1,
          post_id: seemore.id,
          user_id: user?.id,
        },
      ],
    };
    console.log("ordenes", payloadOrder);
    axios
      .post(`${PROXY}/orden/` /*"http://localhost:3001/orden/" */, payloadOrder)
      .then((res) => console.log("post order", res))
      .catch((error) => console.log("err de seemore", error));

    console.log("mercadopago", payloadMp);
    e.preventDefault();
    let response = await axios.post(
      `${PROXY}/checkout/mercadopago/`,
      // "http://localhost:3001/checkout/mercadopago/",
      { payloadMp }
    );
    console.log("res", response);
    window.location.href = response.data.init_points;
  }

  const [ventanaLogIn, setVentanaLogIn] = useState(false);
  const [ventanaRegister, setVentanaRegister] = useState(false);

  function onModalClick(e) {
    console.log("click login");
    e.preventDefault();
    setVentanaLogIn(!ventanaLogIn);
  }
  function onModaleClick(e) {
    console.log("click registro");
    e.preventDefault();
    setVentanaRegister(!ventanaRegister);
  }
  function onModalChange(e) {
    e.preventDefault();
    setVentanaLogIn(!ventanaLogIn);
    setVentanaRegister(!ventanaRegister);
  }

  function onClick(e) {
    e.preventDefault();
    dispatch(
      addToCart({ title: seemore.title, cost: seemore.cost, id: seemore.id })
    );
    
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
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

      {seemore ? (
        <div className=" border-[#2F5D62] text-[#2F5D62]  border-2 max-w-[1300px]">
          <div className="flex m-2  text-[#2F5D62] p-4 border-[#2F5D62] border-b-2">
            <img
              className=" w-[620px] flex-grow p-2"
              src={seemore.image}
              alt="talent_image"
            />

            <div className=" flex-grow p-2 ml-2 max-w-7xl">
              <h1 className="text-4xl font-bold p-2 transform hover:translate-x-6 duration-300 hover:scale-105">
                {seemore.title}
              </h1>
              <Link to={"/profilePublic/" + seemore?.user_id}>
                <h1 className=" ml-2 text-dark text-3xl transform hover:translate-x-6 duration-300 hover:scale-105 hover:underline">
                  by {seemore?.user?.username}
                </h1>
              </Link>
              <p className=" text-2xl mt-2 font-normal border-t-2 border-[#2F5D62] py-2">
                {seemore.description}
              </p>
              <div className="flex flex-wrap flex-row justify-between">
                <div>
                  <p className=" text-1xl p-2 font-bold">Idioma:</p>
                  {seemore?.language}
                </div>
                <div>
                  <p as="span" color="gray.600 fontSize=-sm">
                    Huso horario:
                  </p>
                  {seemore?.timeZone}
                </div>
                <div>
                  <p as="span" color="gray.600" fontSize="sm">
                    Presio: $
                  </p>
                  {seemore.cost}
                </div>
              </div>
              {seemore.user_id !== user.id && user.id ? (
                <div className="flex flex-row  justify-between text-center mt-2">
                  <button
                    className="hover:bg-semidark bg-dark text-[#A7C4BC]  font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300"
                    onClick={(e) => handleCheckOut(e)}
                  >
                    Comprar
                  </button>
                  <button
                    className="hover:bg-semidark bg-dark text-[#A7C4BC]  font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300"
                    onClick={onClick}
                  >
                    Agregar al carrito
                  </button>
                  <Link to="/home">
                    <button className="hover:bg-semidark bg-dark text-[#A7C4BC]  font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300">
                      Volver
                    </button>
                  </Link>
                </div>
              ) : !user.id ? (
                <p status="warning">
                  Ingresa a tu cuenta para adquirir este curso o hacer una
                  pregunta
                </p>
              ) : (
                <div>Esta publicacion te pertenece</div>
              )}
            </div>

            {/* <Reviews /> */}
            {/* {seemore.user_id !== user.id && <QyA />} */}
          </div>
          <QyAanswer />
        </div>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
}
