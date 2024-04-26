import React from "react";
import { PROXY } from "../../actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const body = { email: input.email, password: input.password };

  function reset() {
    resetPassword(body);
    alert("¡La contraseña ha sido cambiada exitosamente");
    setInput({
      email: "",
      password: "",
      password2: "",
    });
    navigate("/");
  }

  function resetPassword(body) {
    axios.put(`${PROXY}/user/editPassword`, body);
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function passCheck(a, b) {
    a === b ? reset() : alert("Las contraseñas deben ser exactamente iguales");
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    passCheck(input.password, input.password2);
  }
  return (
    <div className="flex bg-semidark justify-center items-center w-screen h-screen text-white ">
      <div className=" flex flex-col items-center bg-opacity-40  space-y-4 pt-20 pb-10 pl-8 pr-8 border-4 border-green-100 rounded-2xl">
        <h1 className="max-w-xs text-center text-3xl mb-6">
          Restablecer contraseña
        </h1>
        <form
          className="flex flex-col w-11/12 items-center space-y-6 mb-6"
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <input
            className="h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white text-1xl px-2 w-[330px] placeholder:ml-[50%]"
            placeholder="Correo electrónico"
            type="text"
            value={input.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="h-4  py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white text-1xl px-2 w-[330px]  placeholder:items-center"
            placeholder="Introduce la nueva contraseña"
            type="text"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            className="h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white text-1xl px-2 w-[330px]  placeholder:items-center"
            placeholder="Repite la nueva contraseña"
            type="text"
            value={input.password2}
            name="password2"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit" className=" border-2 p-4 border-gray-100 ">
            Restablecer contraseña
          </button>
        </form>
        <Link to="/">
          <button className="items-center text-2xl p-2 ">Regresar 🔙</button>
        </Link>
      </div>
    </div>
  );
}
