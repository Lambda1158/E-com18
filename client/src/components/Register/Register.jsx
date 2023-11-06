import React, { useEffect } from "react";
import { cargarUsuario, PROXY } from "../../actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

import ReactModal from "react-modal";

import axios from "axios";

export default function Register({ onModaleClick, onModalChange }) {
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(true);
  const [state, setState] = useState({
    type: "password",
    button: "mostrar",
  });

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    birthdate: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnChange(e) {
    e.preventDefault();
    state.type === "password"
      ? setState({ type: "text", button: "ocultar" })
      : setState({ type: "password", button: "mostrar" });
  }

  let regexMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let regexUsername =
    /^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  let fecha = input.birthdate.split("-");

  async function createPass() {
    if (!regexMail.test(input.email)) alert("Ingrese un mail valido");
    else if (!regexUsername.test(input.username))
      alert(
        "Usuario: No puede tener _ ni al principio ni al final, no puede tener __ ni _. dentro y debe tener entre 4-16 caracteres"
      );
    else if (!regexPw.test(input.password))
      alert(
        "Ingrese una contraseña valida. Debe contener 1 Mayuscula, 1 numero y 8-16 caracteres"
      );
    else if (fecha[0] < 1920 || fecha[0] > 2018)
      alert("Ingrese un año valido, entre 1920 y 2018");
    else {
      createUser(input);
      alert("¡El usuario ha sido creado correctamente!");
      let userLogin = {
        username: `${input.username}`,
        password: `${input.password}`,
      };
      let respuesta = await axios
        .post(`${PROXY}/user/loggin/`, userLogin)
        .then((res) => res.data);
      setInput({
        name: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        password2: "",
        birthdate: "",
      });
      dispatch(cargarUsuario(respuesta));
      setIsOpen(false);
    }
  }

  function createUser(input) {
    axios.post(`${PROXY}/user`, input);
  }

  function passCheck(a, b) {
    a === b ? createPass() : alert("Las contraseñas no coinciden");
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    passCheck(input.password, input.password2);
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={onModaleClick}
      contentLabel="Example Modal"
      className="absolute m-auto max-w-max inset-x-0.5 top-14 bg-semidark border rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-90"
    >
      <div className=" bg-dark items-center w-screen text-white m-auto max-w-max inset-16 border border-dark rounded-lg">
        <div className=" bg-semidark bg-opacity-40 border-white border-2 rounded-lg w-80 p-8">
          <h2 className=" text-3xl font-extrabold mb-2">Registro</h2>
          <form className=" space-y-3 mb-1" onSubmit={(e) => handleOnSubmit(e)}>
            <input
              className="h-4 py-5 border-b-2 w-[240px] bg-semidark bg-opacity-0 border-white outline-none placeholder-white"
              placeholder="Nombre"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              className="h-4 py-5 border-b-2 w-[240px] bg-semidark bg-opacity-0 border-white outline-none placeholder-white"
              placeholder="Apellido"
              type="text"
              value={input.lastName}
              name="lastName"
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              className="h-4 py-5 border-b-2 w-[240px] bg-semidark bg-opacity-0 border-white outline-none placeholder-white"
              placeholder="Correo electrónico"
              type="email"
              value={input.email}
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              className="h-4 py-5 mt-5 border-b-2 w-[240px] bg-semidark bg-opacity-0 border-white outline-none placeholder-white"
              placeholder="Nombre de usuario"
              type="text"
              value={input.username}
              name="username"
              onChange={(e) => handleChange(e)}
              required
            />
            <div className=" flex h-[90px]">
              <div>
                <div className=" border h-[45px] ">
                  <input
                    className="h-4 py-5 px-2 bg-semidark w-11/12 bg-opacity-0 border-white outline-none placeholder-white"
                    placeholder="Contraseña"
                    type={state.type}
                    value={input.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                    required
                    autoComplete="on"
                  />
                </div>
                <div className=" border  h-[45px] ">
                  <input
                    className="h-4 py-5 px-2 bg-semidark w-11/12 bg-opacity-0 border-white outline-none placeholder-white"
                    placeholder="Repite contraseña"
                    type={state.type}
                    value={input.password2}
                    name="password2"
                    onChange={(e) => handleChange(e)}
                    required
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className=" border flex">
                <button className=" p-3" onClick={(e) => handleOnChange(e)}>
                  {state.button}
                </button>
              </div>
            </div>
            <div className="flex flex-col ">
              <label name="fecha-nacimiento" className="mt-2 text-center">
                Fecha de Nacimiento
              </label>
              <input
                className="bg-semidark text-center hover:bg-dark transition duration-300 mt-2 ease-in-out rounded-lg"
                type="date"
                value={input.birthdate}
                name="birthdate"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="flex justify-center m-2">
              <button
                className=" border rounded-sm p-3 mt-3 hover:bg-dark "
                type="submit"
              >
                Registrarme
              </button>
            </div>
          </form>
          <div className="flex justify-around mt-6">
            <p className="text-sm">¿Ya tienes cuenta?</p>
            <button
              onClick={onModalChange}
              className="text-1xl font-semibold underline "
            >
              ¡Iniciar sesión!
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
