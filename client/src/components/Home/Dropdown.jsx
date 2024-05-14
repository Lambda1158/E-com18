import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import defaultImage from "../../assets/profile_default.png";
import { desloguear, getUserbyId } from "../../actions";
import { clearItemsCart } from "../../actions/shoppingActions";

export default function Dropdown() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = (e) => {
    e.preventDefault();
    dispatch(desloguear());
    navigate("/");
  };
  return (
    <Menu>
      <MenuButton className="m-3 h-9 w-9" as={Button}>
        <img
          className="h-9 w-9 border-solid border-black rounded-full"
          src={user?.image ? user?.image : defaultImage}
          alt="user_image"
        />
      </MenuButton>
      <MenuList className="bg-light m-2">
        <MenuGroup>
          Hola <b>{user.username}</b>
        </MenuGroup>
        <MenuDivider />
        <Link to={"/profile/" + user.id}>
          <MenuItem>Mi perfil</MenuItem>
        </Link>
        {user.email_verified || user.aprobado ? (
          <Link to="/createTalent">
            <MenuItem>Publicar</MenuItem>
          </Link>
        ) : (
          <MenuItem color="#c7aeab">Publicar</MenuItem>
        )}
        {/* <Link to="/createTalent">
          <MenuItem>Publicar</MenuItem>
        </Link> */}
        {user.email_verified || user.aprobado ? (
          <Link to={"/cart"}>
            <MenuItem>Carrito</MenuItem>
          </Link>
        ) : (
          <MenuItem color="#c7aeab">Carrito</MenuItem>
        )}
        {/* <Link to={"/cart"}>
          <MenuItem>Carrito</MenuItem>
        </Link> */}
        <Link to={"/messenger"}>
          <MenuItem>Chat</MenuItem>
        </Link>

        <Link to="/faq">
          <MenuItem>Preguntas frecuentes</MenuItem>
        </Link>
        <MenuDivider />
        <MenuItem onClick={(e) => logOut(e)}>Cerrar sesion</MenuItem>
      </MenuList>
    </Menu>
  );
}
