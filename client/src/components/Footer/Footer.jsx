import React from "react";
import { useNavigate } from "react-router-dom";
import LinksRedes from "./Links";
import logo from "../../assets/logo.png";
const enlaces = [
  { label: "Home", link: "home" },
  { label: "Preguntas Frecuentes", link: "faq" },
  { label: "Acerca de Nosotros", link: "about" },
  { label: "Terminos y condiciones", link: "" },
  { label: "Politica de privacidad", link: "" },
];
const Lista = ({ array }) => {
  const navigate = useNavigate();
  const linkOnclick = (link) => {
    if (link === "") return;
    navigate("/" + link);
    window.scrollTo(0, 0);
  };
  return (
    <ul className=" space-y-[1px]">
      {array.map((element, index) => {
        return (
          <li className=" hover:scale-105 duration-300" key={index}>
            <span
              className=" text-base font-normal hover:underline cursor-pointer"
              onClick={() => linkOnclick(element.link)}
            >
              {element.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-semidark ">
      <div className="grid grid-cols-3  text-black w-3/5 mx-auto">
        <div className="mt-4 xxl:w-[300px] w-[200px]">
          <img src={logo} alt="logo-hitalent" width="140px" className="mb-2" />
          <p className=" text-sm font-normal ">
            En nuestra plataforma puedes conectar con personas que esten
            interesadas en compartir su talento contigo, podras aprender lo que
            quieras en solo un click.
          </p>
        </div>
        <div className="grid col-start-2 col-end-3 mt-4">
          <h4 className=" font-semibold text-xl">Enlaces y Sitios</h4>
          <Lista array={enlaces} />
        </div>
        <div className="mt-4 ">
          <h4 className="font-semibold text-xl mb-4">Conecta con Nosotros</h4>
          <LinksRedes />
        </div>
      </div>
      <article className=" border-t-[1px] border-black text-center p-1 font-normal text-sm">
        &copy; {date} HiTalent
      </article>
    </footer>
  );
}
