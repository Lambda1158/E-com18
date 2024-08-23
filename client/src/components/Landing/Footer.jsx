import React from "react";
import { useNavigate } from "react-router-dom";

const Lista = ({ children, link }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/" + link);
  };
  return (
    <li
      onClick={onClick}
      className="hover:scale-105 transform duration-300 hover:underline hover:translate-x-4"
    >
      {children}
    </li>
  );
};

export default function Footer() {
  return (
    <footer className="grid grid-cols-3 bg-semidark text-black ">
      <div className="grid col-start-1 col-end-2 m-3">
        <img
          src="https://codes.unidepix.com/img/hi.png"
          alt="logo-hitalent"
          width="160px"
        />
        <small className=" text-sm font-medium mt-2">
          En nuestra plataforma puedes conectar con personas que esten
          interesadas en compartir su talento contigo, podras aprender lo que
          quieras en solo un click. Deja tu valoracion para que ellos puedan
          ganar prestigio!
        </small>
      </div>
      <div className="grid col-start-2 col-end-3 m-3">
        <h4 className=" font-semibold text-xl">Enlaces y Sitios</h4>
        <ul className=" text-lg font-medium ">
          <Lista link={"home"}>Home</Lista>
          <Lista link={"faq"}>Preguntas Frecuentes</Lista>
          <Lista link={"about"}>Acerca de Nosotros</Lista>
        </ul>
      </div>
      <div className="m-3 text-center">
        <h4 className="font-semibold text-2xl mb-[40px]">Social media</h4>
        <ul className="inline-block">
          <li className=" inline-block mr-4">
            <a href="https://www.facebook.com/">
              <img
                className="h-[40px] hover:scale-125 transform duration-100"
                src="https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg"
                alt="facebook-logo"
              />
            </a>
          </li>
          <li className="inline-block mr-4">
            <a href="https://www.instagram.com/">
              <img
                className="h-[40px] hover:scale-125 transform duration-100"
                src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg"
                alt="instagram-logo"
              />
            </a>
          </li>
          <li className="inline-block">
            <a href="https://www.linkedin.com/">
              <img
                className="h-[40px] hover:scale-125 transform duration-100"
                src="https://www.vectorlogo.zone/logos/linkedin/linkedin-tile.svg"
                alt="linkedin-logo"
              />
            </a>
          </li>
        </ul>
      </div>
      <article className="grid col-start-2 col-end-3 m-3 font-semibold text-lg">
        &copy; 2024 HiTalent. Todos los derechos reservados
      </article>
    </footer>
  );
}
