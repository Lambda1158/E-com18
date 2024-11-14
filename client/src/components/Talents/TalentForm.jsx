import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/action-talents/talents";
import Footer from "../Footer/Footer";
import NavbarComp from "../Navbar/NavbarComp";
import FormInputs from "./FormInputs";
import Modalinfo from "./Modalinfo";

function TalentForm() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const categories = useSelector((state) => state.mislice.categories);
  const [ventanaModal, setVentanaModal] = useState(false);
  const toggleModal = () => {
    setVentanaModal((prev) => !prev);
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (ventanaModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [ventanaModal]);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavbarComp />
      <FormInputs modal={toggleModal} categories={categories} />
      {ventanaModal && (
        <Modalinfo
          error={{ error: state.error, message: state.message }}
          cargando={state.cargando}
          toggleModal={toggleModal}
        />
      )}
      <Footer />
    </div>
  );
}

export default TalentForm;
