import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { getTalents } from "../../actions/action-talents/talents";
import { SortByPrice } from "../Sort/SortByPrice";
import Spinner from "../Spinner/Spinner";
import { SortByCategorie } from "../Sort/SortByCategorie";
import SimpleSlider from "./SimpleSlider";
import NavbarComp from "../Navbar/NavbarComp";
export default function Home() {
  let skill = useSelector((state) => state.mislice.filteredTalents);
  //let skillAprobados = skill.filter(el => el.aprobado === true);
  const cargando = useSelector((state) => state.cargando);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTalents());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col max-w-full overflow-x-hidden">
      <NavbarComp />
      <h2 className="text-4xl text-center p-2 font-semibold underline underline-offset-4 text-[#2F5D62]">
        ¡Aventurate al desafio de enseñar y aprender nuevos talentos!
      </h2>
      <div className="flex justify-center space-x-10 font-semibold text-xl mt-4">
        <SortByCategorie />
        <SortByPrice />
      </div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          {skill?.length === 0 ? (
            <div className="text-4xl h-[300px] mt-10 flex-grow font-semibold text-[#2F5D62]  m-4 w-full">
              <h1 className="text-center">
                Ups! no encontramos lo que buscas, intenta de nuevo
              </h1>
            </div>
          ) : (
            <SimpleSlider items={skill}></SimpleSlider>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}
