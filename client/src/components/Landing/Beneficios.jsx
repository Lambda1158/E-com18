import React from "react";
import VideoLanding from "../../assets/videolanding.mp4";

export default function Beneficios() {
  return (
    <div className="flex flex-wrap justify-center content-around items-center bg-light h-96 flex-col p-2">
      <h3 className="font-semibold text-2xl mb-6">¿Que puedes encontrar?</h3>
      <div className="flex bg-semidark rounded-sm p-2">
        <ul className="p-2">
          <li className="m-2">
            <h4 className="font-semibold">Lo mejor en cada compra.</h4>
            Encuentra servicios de la mejor calidad al mejor precio. Sin precio
            por hora, paga por la experiencia completa.
          </li>

          <li className="m-2">
            <h4 className="font-semibold">Encuentra calidad rápidamente.</h4>
            Busca el talento que quieras, encuentra el correcto para aprenderlo
            al momento.
          </li>

          <li className="m-2">
            <h4 className="font-semibold">Protejemos tus pagos, siempre.</h4>
            Tus datos estan seguros, puedes comprar todo sin riesgos.
          </li>
        </ul>
      </div>
      <div className="flex justify-end ">
        <video className="flex h-64 flex-wrap" autoPlay loop muted>
          <source src={VideoLanding} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
