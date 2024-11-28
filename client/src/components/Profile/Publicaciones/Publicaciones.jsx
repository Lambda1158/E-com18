import React from "react";
import NoPublicaciones from "./NoPublicaciones";
import CardPublicacion from "./CardPublicacion";
export default function Publicaciones({ talentosUsuario }) {
  if (!talentosUsuario.length) return <NoPublicaciones />;
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <h2 className="text-3xl font-normal mb-6 cursor-default ">
        Publicaciones
      </h2>
      <section className="flex w-full gap-4 p-2">
        {talentosUsuario.map((element) => {
          return <CardPublicacion key={element.id} element={element} />;
        })}
      </section>
    </div>
  );
}
