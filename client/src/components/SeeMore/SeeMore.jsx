import React, { useEffect, useState } from "react";
import { PROXY } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTalentById } from "../../actions";
import Nav from "../Profile/Nav";
import Footer from "../Landing/Footer";
import { Link } from "react-router-dom";
import { Box, useToast, Button, Image } from "@chakra-ui/react";
import QyA from "./Q&A";
import QyAanswer from "./Q&Aanswer";
import Reviews from "./Reviews";
import axios from "axios";
import { addToCart } from "../../actions/shoppingActions";
import Spinner from "../Spinner/Spinner";
import { Alert, AlertIcon } from "@chakra-ui/react";
import Form from "../SignIn/FormSI";
import Register from "../Register/Register";

export default function SeeMore() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { id } = useParams();
  const seemore = useSelector((state) => state.misliceReducer.moreTalent);
  const user = useSelector((state) => state.userSliceReducer.user);
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
    toast({
      position: "bottom-right",
      render: () => (
        <Box color="white" p={3} bg="green.500">
          Agregado al carrito
        </Box>
      ),
    });
  }

  return (
    <div className="seemore">
      <Nav
        onModalChange={onModalChange}
        onModaleClick={onModaleClick}
        onModalClick={onModalClick}
      />

      <div>
        {ventanaLogIn ? (
          <Form onModalClick={onModalClick} onModalChange={onModalChange} />
        ) : (
          <></>
        )}

        {ventanaRegister ? (
          <Register
            onModaleClick={onModaleClick}
            onModalChange={onModalChange}
          />
        ) : (
          <></>
        )}
      </div>

      {seemore ? (
        <div className="w-[750px] ml-[20%] border-2 rounded-3xl p-1  border-gray-400">
          <img
            className="rounded-3xl ml-2 p-2 w-[700px]"
            src={seemore.image}
            alt="talent_image"
          />

          <Box p="6">
            <Link to={"/profilePublic/" + seemore?.user_id}>
              <h1 className=" ml-2 text-dark text-2xl transform-all duration-100 ease-in-out hover:font-bold hover:underline">
                by {seemore?.user?.username}
              </h1>
            </Link>
            <h1 className="text-4xl font-semibold p-2">{seemore.title}</h1>
            <p className=" text-1xl font-medium">{seemore.description}</p>
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
              <Box className="flex flex-col items-center" m="2">
                <Button onClick={(e) => handleCheckOut(e)}>Comprar</Button>
                <Box as="span" m="2" color="gray.600" fontSize="sm">
                  <Button onClick={onClick}>Agregar al carrito</Button>
                </Box>
              </Box>
            ) : !user.id ? (
              <p status="warning">
                Ingresa a tu cuenta para adquirir este curso o hacer una
                pregunta
              </p>
            ) : (
              <Alert status="info">
                <AlertIcon />
                Esta publicacion te pertenece
              </Alert>
            )}
          </Box>
          <QyAanswer />
          <Reviews />
          {seemore.user_id !== user.id && <QyA />}

          <Box>
            <Link to="/home">
              <Button m="2">Volver</Button>
            </Link>
          </Box>
        </div>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
}
