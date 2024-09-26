import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../actions/statereducer";
const useModal = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.state);
  const [ventanaLogIn, setVentanaLogIn] = useState(false);
  const [ventanaRegister, setVentanaRegister] = useState(false);

  function onModalClick() {
    setVentanaLogIn(!ventanaLogIn);
    if (ventanaLogIn && error.error) {
      dispatch(clearError());
    }
  }

  function onModaleClick() {
    setVentanaRegister(!ventanaRegister);
    if (ventanaRegister && error.error) {
      dispatch(clearError());
    }
  }

  function onModalChange() {
    setVentanaLogIn(!ventanaLogIn);
    setVentanaRegister(!ventanaRegister);
    dispatch(clearError());
  }
  return {
    ventanaLogIn,
    ventanaRegister,
    onModalClick,
    onModaleClick,
    onModalChange,
  };
};

export default useModal;
