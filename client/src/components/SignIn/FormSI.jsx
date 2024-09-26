import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logearUsuario } from "../../actions/action-talents/user";

function Form({ onModalClick, onModalChange, isOpen }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const { user } = useSelector((state) => state.user);
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
    mantenerSesion: false,
  });

  function handleOnChange(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  function handleSession(e) {
    setUserLogin({
      ...userLogin,
      mantenerSesion: !userLogin.mantenerSesion,
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(logearUsuario(userLogin));
  }

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleOnSubmit(e);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (user?.username) {
      onModalClick();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [user, onModalClick]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onModalClick}
      contentLabel="Example Modal"
      className=" absolute m-auto max-w-max inset-x-0 top-40 bg-dark border-2 border-white rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-90"
    >
      <div className="flex h-96 items-center flex-col bg-dark bg-opacity-40  border-2 text-white w-96 space-y-4">
        <h2 className="text-3xl my-2 font-medium">Iniciar sesion</h2>
        <form
          className="text-center space-y-4"
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <div className="flex flex-col space-y-5">
            <input
              name="username"
              type="text"
              placeholder="Usuario / Email"
              onChange={(e) => handleOnChange(e)}
              required
              className="h-8 w-11/12 bg-semidark hover:bg-semidark bg-opacity-0 border-2 focus:outline-none placeholder-white rounded-2xl p-5"
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handleOnChange}
              onKeyDown={handleKey}
              required
              autoComplete="on"
              className="h-8  w-11/12 bg-semidark hover:bg-semidark bg-opacity-0 border-2 focus:outline-none placeholder-white rounded-2xl p-5"
            />
          </div>
          <div className="flex flex-row items-center">
            <label>Recuérdame</label>
            <input
              className="ml-2"
              onChange={handleSession}
              value=""
              type="checkbox"
            />
            <Link
              to="/user/emailresetpassword"
              className="ml-14 underline font-bold hover:scale-110 transform duration-200"
            >
              Olvide mi contraseña
            </Link>
          </div>
          <div className="flex justify-around">
            <button className="border p-3 w-[120px] hover:bg-dark  border-white rounded-lg hover:scale-105 transform duration-200">
              Ingresar
            </button>
            <button
              onClick={onModalClick}
              className="border rounded-lg p-3 hover:bg-dark w-[120px]  border-white hover:scale-105 transform duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
        <div className="flex justify-center content-center items-center m-4">
          <p className="text-sm mr-2">¿No tienes cuenta?</p>
          <button
            onClick={onModalChange}
            className="text-1xl underline  font-semibold transform hover:scale-105 duration-150"
          >
            ¡Registrate ahora!
          </button>
        </div>
        {state.message && <spam>{state.message}</spam>}
      </div>
    </ReactModal>
  );
}

export default Form;
