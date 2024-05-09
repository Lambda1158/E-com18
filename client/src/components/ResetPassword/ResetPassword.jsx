import React from "react";
import { PROXY } from "../../actions";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    newpassword: "",
    newpassword2: "",
  });

  const { token } = useParams();
  function reset() {
    resetPassword(input.newpassword2);
    alert("¡La contraseña ha sido cambiada exitosamente");
    setInput({
      newpassword: "",
      newpassword2: "",
    });
    navigate("/");
  }

  function resetPassword(password) {
    axios.put(`${PROXY}/user/editPassword`, { password, token });
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
    passCheck(input.newpassword, input.newpassword2);
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
            className="h-4  py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white text-1xl px-2 w-[330px]  placeholder:items-center"
            placeholder="Introduce la nueva contraseña"
            type="text"
            value={input.newpassword}
            name="newpassword"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            className="h-4 py-5 border-b-2 bg-semidark bg-opacity-0 border-white outline-none placeholder-white text-1xl px-2 w-[330px]  placeholder:items-center"
            placeholder="Repite la nueva contraseña"
            type="text"
            value={input.newpassword2}
            name="newpassword2"
            onChange={(e) => handleChange(e)}
            required
          />
          <button
            type="submit"
            className=" hover:bg-dark border-2 p-4 border-gray-100 "
          >
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
