import React from "react";
import StarsRating from "../Home/Star";
import { CgCornerDownRight } from "react-icons/cg";
export default function Reviews({ items }) {
  return (
    <section className="p-4 ">
      <h1 className="text-2xl mb-2 font-normal ">Opiniones del producto</h1>
      {!items?.length ? (
        <div className="flex ml-2 items-center text-lg">
          <CgCornerDownRight />
          <span className="ml-2 italic text-gray-400">
            Aún no hay reseñas. ¡Sé el primero en dejar una reseña!
          </span>
        </div>
      ) : (
        <>
          <div>
            {items.map((element) => {
              return (
                <div className="flex px-4 items-center" key={element.id}>
                  <p className="text-lg capitalize italic mr-2 ">{element.description}</p>
                  <StarsRating rating={element.qualification} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
