import { useState, useEffect } from "react";
import {
  updateTalent,
  deletTalent,
} from "../../../../actions/action-talents/talents";
import { useDispatch, useSelector } from "react-redux";
export function usePublicacion(element) {
  const [eliminarModal, setEliminarModal] = useState(false);
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const [editMode, setEditemode] = useState(false);
  const toggleEdit = () => {
    setEditemode((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const data = Object.fromEntries(newForm.entries());
    data.id = element.id;
    data.user = element.user_id;
    dispatch(updateTalent(data));
    toggleEdit();
  };
  const toggleEliminar = () => {
    setEliminarModal((prev) => !prev);
  };
  const borrarTalento = () => {
    dispatch(deletTalent(element.id));
    toggleEliminar();
  };

  useEffect(() => {
    if (eliminarModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [eliminarModal]);
  return {
    editMode,
    toggleEdit,
    handleSubmit,
    borrarTalento,
    state,
    eliminarModal,
    toggleEliminar,
  };
}
