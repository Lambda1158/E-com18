import React from "react";
import { PROXY } from "../../actions";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmailResetPassword() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  function sendEmailPass(input) {
    axios.post(`${PROXY}/user/emailResetPassword`, { email: input });
    alert("Se ha enviado un mensaje a tu correo, favor de revisarlo.");
    navigate("/");
  }

  function handleChange(e) {
    setInput(e);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    sendEmailPass(input.target.value);
  }
  return (
    <div className="flex bg-semidark justify-center items-center w-screen h-screen text-white">
      <div className="flex flex-col items-center bg-opacity-40  space-y-4 pt-20 pb-10 pl-8 pr-8 border-4 border-green-100 rounded-2xl">
        <h1 className=" text-center font-medium tracking-wide text-4xl mb-6">
          Restablecer contraseña
        </h1>
        <div className="flex flex-col justify-center items-center">
          <form
            className="flex flex-col items-center space-y-6 mb-6"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <input
              className="h-4 py-5 px-2 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white text-2xl w-[350px]"
              placeholder="Introduce tu correo electrónico"
              type="email"
              value={input.email}
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
            <button
              type="submit"
              className="rounded-1xl border-green-100 text-2xl border-2 p-2"
            >
              Enviar correo
            </button>
          </form>
          <Link to="/">
            <button className=" text-2xl hover:underline">Regresar 🔙</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
