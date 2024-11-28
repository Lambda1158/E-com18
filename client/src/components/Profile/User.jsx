import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editarUsuario } from "../../actions/action-talents/user";
import defaultImage from "../../assets/profile_default.png";
import Edit from "./Edit";
import { setError } from "../../actions/statereducer";
import LinksRedes from "../Footer/Links";

export default function User({ modal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const error = useSelector((state) => state.state);
  const [isEditing, setIsEditing] = useState({
    username: false,
    resume: false,
    country: false,
  });
  const [editedName, setEditedName] = useState({
    username: user.username,
    resume: user.resume,
    country: user.country,
    newusername: user.username,
  });

  const edit = (obj) => {
    if (obj.close) {
      setIsEditing((prev) => ({
        ...prev,
        [obj.text]: !prev[obj.text],
      }));
      return setEditedName((prev) => ({
        ...prev,
        [obj.text]: user[obj.text],
      }));
    }
    setIsEditing((prev) => ({
      ...prev,
      [obj]: !prev[obj],
    }));
  };

  function handleOnClick(e) {
    e.preventDefault();
    modal(true);
  }
  const handleChange = (e) => {
    e.preventDefault();
    setEditedName((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const volver = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };
  const guardarCambios = () => {
    for (let key in editedName) {
      if (
        editedName[key] === undefined ||
        editedName[key] === null ||
        editedName[key] === ""
      )
        dispatch(setError("Datos incorrectos"));
    }
    dispatch(editarUsuario(editedName));
  };

  return (
    <div className="flex flex-col py-6 px-8 bg-dark  text-white rounded-lg space-y-4  max-w-[440px] shadow-outline ">
      <div className="mx-auto">
        <img
          className="rounded-full border-4 border-semilight w-[250px] h-[270px]"
          src={user.image ? user.image : defaultImage}
          alt={user.username}
        />
        <div className="flex opacity-30 relative bottom-9 left-[190px] justify-center items-center w-10 h-10 bg-gray rounded-full shadow-xl hover:opacity-100 duration-70">
          <button onClick={(e) => handleOnClick(e)}>
            <img
              width="40px"
              heigth="40px"
              src="https://codes.unidepix.com/img/photo.svg"
              alt="userpic"
            />
          </button>
        </div>
      </div>
      <h4 className="text-3xl font-medium hover:scale-105 transform duration-200 underline">
        {user.fullName}
      </h4>
      <div>
        <p className="text-xl font-medium text-gray">Nombre de usuario:</p>
        <Edit
          isEditing={isEditing}
          handleChange={handleChange}
          edit={edit}
          text={"username"}
          editedName={editedName}
        />
      </div>
      <p className="font-medium ">
        Registrado desde: {user.createdAt.slice(0, 10)}
      </p>
      <div className=" min-w-[300px]">
        <p className="font-medium text-xl">Sobre mi: </p>
        <Edit
          isEditing={isEditing}
          handleChange={handleChange}
          edit={edit}
          text={"resume"}
          editedName={editedName}
        />
      </div>
      <div>
        <p className="font-medium text-xl">Pais:</p>
        <Edit
          isEditing={isEditing}
          handleChange={handleChange}
          edit={edit}
          text={"country"}
          editedName={editedName}
        />
      </div>
      <div>
        <h5 className="font-medium text-xl mb-2">Redes sociales:</h5>
        <LinksRedes />
      </div>

      <button
        onClick={volver}
        className=" border-2 rounded-xl border-white text-sm font-medium font-sans p-2 hover:bg-semilight hover:text-[#2F5D62] hover:border-[#5E8B7E] "
      >
        Volver
      </button>
      <button
        onClick={guardarCambios}
        className=" border-2 rounded-xl border-white text-sm font-medium font-sans p-2 hover:bg-semilight hover:text-[#2F5D62] hover:border-[#5E8B7E] "
      >
        Editar
      </button>
      {error.error && (
        <p className=" text-lg font-semibold p-2">{error.message}</p>
      )}
    </div>
  );
}
