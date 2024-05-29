import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserbyId, editarUsuario } from "../../actions";
import defaultImage from "../../assets/profile_default.png";
import Edit from "./Edit";
//import { Box, Image, Button } from '@chakra-ui/react';

export default function User({ modal }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState({
    username: false,
    resume: false,
    country: false,
  });
  const [editedName, setEditedName] = useState({
    username: user.username,
    resume: user.resume,
    country: user.country,
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
  //   useEffect(() => {
  //     dispatch(getUserbyId(id));
  //   }, [modal, id, dispatch]);

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
  };
  const guardarCambios = () => {
    for (let i in editedName) {
      if (editedName[i].length < 1)
        return alert("No se pueden Guardar cambios");
    }
    dispatch(editarUsuario(editedName));
  };
  return (
    <>
      {!user ? (
        <h2>Cargando...</h2>
      ) : (
        <div className="flex flex-col py-6 px-8 bg-dark  text-white rounded-lg space-y-4  max-w-[440px] shadow-outline ">
          <div>
            <img
              className="rounded-full border-4 border-semilight w-[220px]"
              src={user.image ? user.image : defaultImage}
              alt={user.username}
            />
            <div className="flex opacity-30 relative bottom-9 left-44 justify-center items-center w-10 h-10 bg-gray rounded-full shadow-xl hover:opacity-100 duration-70">
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

          <div className="">
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
          <div>
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
            <h5 className="font-medium text-xl">Redes sociales:</h5>
            <button className="mt-2 mr-2">
              <img
                className="w-7 h-7 mr-2"
                alt="Facebook logo"
                src="http://codes.unidepix.com/img/facebook.svg"
              />
            </button>
            <button className="mt-2">
              <img
                className="w-7 h-7 mr-2"
                alt="Google logo"
                src="http://codes.unidepix.com/img/google.svg"
              />
            </button>
          </div>

          <button
            onClick={volver}
            className=" border-2 rounded-xl border-white text-sm font-medium font-sans p-2 "
          >
            Volver
          </button>
          <button
            onClick={guardarCambios}
            className=" border-2 rounded-xl border-white text-sm font-medium font-sans p-2 "
          >
            Editar
          </button>
        </div>
      )}
    </>
  );
}
