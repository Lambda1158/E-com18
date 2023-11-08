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
          console.log("ingreso")
        )}

        {ventanaRegister ? (
          <Register
            onModaleClick={onModaleClick}
            onModalChange={onModalChange}
          />
        ) : (
          console.log("registro")
        )}
      </div>

      {seemore ? (
        <Box
          m="auto"
          mt="2"
          mb="2"
          maxW="lg"
          maxH="80em"
          borderWidth="2px"
          borderRadius="lg"
          overflow="scroll"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#5E8B7E",
              borderRadius: "24px",
            },
          }}
        >
          <Image src={seemore.image} alt="talent_image" />

          <Box p="6">
            <Link to={"/profilePublic/" + seemore?.user_id}>
              <h4 class="text-dark text-sm hover:text-semilight">
                by {seemore?.user?.username}
              </h4>
            </Link>
            <Box
              mt="2"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              fontSize="25"
              isTruncated
            >
              {seemore.title}
            </Box>

            <Box>{seemore.description}</Box>

            <Box>
              <Box as="span" color="gray.600 fontSize=-sm">
                Idioma:
              </Box>
              {seemore?.language}
            </Box>

            <Box>
              <Box as="span" color="gray.600 fontSize=-sm">
                Huso horario:
              </Box>
              {seemore?.timeZone}
            </Box>

            <Box>
              <Box as="span" color="gray.600" fontSize="sm">
                $
              </Box>
              {seemore.cost}
            </Box>
            {seemore.user_id !== user.id && user.id ? (
              <Box class="flex flex-col items-center" m="2">
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
        </Box>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
}
