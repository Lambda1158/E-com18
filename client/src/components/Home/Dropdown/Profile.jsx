import React from "react";
import { useDispatch } from "react-redux";
import { desloguear } from "../../../actions/action-talents/user";
import { useNavigate } from "react-router-dom";
import SubItem from "./SubItem";
const Profile = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = (e) => {
    e.preventDefault();
    dispatch(desloguear());
    navigate("/");
  };
  return (
    <ul className=" cursor-pointer">
      <SubItem link={"/profile/" + id}>Mi perfil 🤠 </SubItem>
      <SubItem link={"/createTalent"}>Publicar 📮 </SubItem>
      <SubItem link={"/cart"}>Mi Carrito 🛍 </SubItem>
      <SubItem link={"/faq"}>Preguntas Frecuentes</SubItem>
      <SubItem link={"/messenger"}>Chat 🙊 </SubItem>
      <li onClick={logOut} className=" pl-2 font-semibold transform hover:scale-105 duration-75 hover:bg-[#2F5D62] hover:text-white">
        Cerrar Sesion 🔐 
      </li>
    </ul>
  );
};

export default Profile;
