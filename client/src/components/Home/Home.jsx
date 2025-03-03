import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { getTalents } from "../../actions/action-talents/talents";
import Spinner from "../Spinner/Spinner";
import SimpleSlider from "./SimpleSlider";
import NavbarComp from "../Navbar/NavbarComp";
import SearchSort from "../SearchSort/SearchSort";
export default function Home() {
  const skill = useSelector((state) => state.mislice.filteredTalents);
  const cargando = useSelector((state) => state.cargando);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cargando) return <Spinner />;
    dispatch(getTalents());
  }, [dispatch, cargando]);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#ebebeb]">
      <NavbarComp />
      <SearchSort />
      {!skill.length ? (
        <div className="text-4xl h-[300px] mt-10 flex-grow font-semibold text-[#2F5D62]  m-4 w-full">
          <h1 className="text-center">
            Ups! no encontramos lo que buscas, intenta de nuevo
          </h1>
          <button
            className="block mt-10 rounded-sm w-[180px] mx-auto bg-dark p-2 border-black border-1 hover:scale-110 duration-300 text-white"
            onClick={() => dispatch(getTalents())}
          >
            Refresh
          </button>
        </div>
      ) : (
        <section className="w-10/12 mx-auto p-4 mb-6 border-[1px] border-gray-200 bg-white">
          <h1 className="font-normal text-3xl">Items del Dia</h1>
          <SimpleSlider items={skill}></SimpleSlider>
        </section>
      )}

      <Footer />
    </main>
  );
}
