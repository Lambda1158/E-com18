import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../actions/statereducer";
const useModal = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.state);
  const { user } = useSelector((state) => state.user);
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
  useEffect(() => {
    if (ventanaLogIn || ventanaRegister) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [ventanaLogIn, ventanaRegister]);
  useEffect(() => {
    if (user.username) {
      setVentanaLogIn(false);
      setVentanaRegister(false);
    }
  }, [user]);

  return {
    ventanaLogIn,
    ventanaRegister,
    onModalClick,
    onModaleClick,
    onModalChange,
  };
};

export default useModal;
