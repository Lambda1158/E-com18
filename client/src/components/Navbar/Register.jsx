import React from "react";
import { crearUsuario, logearUsuario } from "../../actions/action-talents/user";
import { useState } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Register({ onModaleClick, onModalChange }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.state);
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
  function handleOnSubmit(e) {
    let regexMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let regexUsername =
      /^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    let fecha = input.birthdate.split("-");
    e.preventDefault();
    if ((input.password, input.password2))
      alert("Las contraseñas no coinciden");
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
      dispatch(crearUsuario(input));
      let userLogin = {
        username: `${input.username}`,
        password: `${input.password}`,
      };
      dispatch(logearUsuario(userLogin));

      setInput({
        name: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        password2: "",
        birthdate: "",
      });
    }
  }
  return ReactDom.createPortal(
    <div className="absolute top-0 left-0 bg-black w-screen h-screen bg-opacity-90">
      <div className="fixed top-[7%] left-[39%] bg-dark items-center text-white ">
        <div className=" border-white border-2   rounded-lg ">
          <h2 className=" text-xl font-normal mb-2 p-2 text-center">
            Registrate! 🤩
          </h2>
          <form
            className=" text-center text-sm "
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <div className=" flex  flex-col gap-2 items-center">
              <input
                className="h-2 p-4 border-2 w-[240px] bg-semidark hover:bg-semidark bg-opacity-0 border-white outline-none placeholder-white rounded-full"
                placeholder="Nombre"
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                required
              />
              <input
                className=" h-2 p-4 border-2 w-[240px] bg-semidark hover:bg-semidark bg-opacity-0 border-white outline-none placeholder-white rounded-full"
                placeholder="Apellido"
                type="text"
                value={input.lastName}
                name="lastName"
                onChange={(e) => handleChange(e)}
                required
              />
              <input
                className="h-2 p-4 border-2 w-[240px] bg-semidark hover:bg-semidark bg-opacity-0 border-white outline-none placeholder-white rounded-full"
                placeholder="Correo electrónico"
                type="email"
                value={input.email}
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
              <input
                className="h-2 p-4  border-2 w-[240px] bg-semidark hover:bg-semidark bg-opacity-0 border-white outline-none placeholder-white rounded-full"
                placeholder="Nombre de usuario"
                type="text"
                value={input.username}
                name="username"
                onChange={(e) => handleChange(e)}
                required
              />
              <input
                className=" h-2 p-4 border-2 w-[240px]  bg-semidark hover:bg-semidark bg-opacity-0 border-white outline-none placeholder-white rounded-full "
                placeholder="Contraseña"
                type="password"
                value={input.password}
                name="password"
                onChange={(e) => handleChange(e)}
                required
                autoComplete="on"
              />
              <input
                className=" h-2 p-4 border-2 w-[240px] bg-semidark hover:bg-semidark  bg-opacity-0 border-white outline-none placeholder-white rounded-full"
                placeholder="Repite contraseña"
                type="password"
                value={input.password2}
                name="password2"
                onChange={(e) => handleChange(e)}
                required
                autoComplete="on"
              />
            </div>
            <div className="flex flex-col w-[200px] mx-auto mt-4 border-2 border-white p-2 rounded-lg ">
              <label name="fecha-nacimiento" className="mt-2 text-center">
                Fecha de Nacimiento
              </label>
              <input
                className="bg-semidark text-center hover:bg-slate-500 transition duration-300 mt-2 ease-in-out rounded-lg"
                type="date"
                value={input.birthdate}
                name="birthdate"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="flex justify-evenly mt-2">
              <button
                className=" border rounded-lg p-4 mt-3 transform hover:scale-105 duration-150 text-sm font-bold w-[110px] "
                type="submit"
              >
                Registrarme
              </button>
              <button
                type="button"
                className=" border rounded-lg p-3 mt-3 transform hover:scale-105 duration-150 text-sm font-bold w-[110px] "
                onClick={onModaleClick}
              >
                Cancelar
              </button>
            </div>
          </form>
          <div className="flex gap-2 justify-center mt-4 p-4">
            <p className="text-lg font-normal ">¿Ya tienes cuenta?</p>
            <span
              onClick={onModalChange}
              className="text-xl font-semibold underline hover:cursor-pointer transform hover:scale-105 duration-150 "
            >
              ¡Iniciar sesión!
            </span>
          </div>
          {error.message && <span>{error.message}</span>}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
