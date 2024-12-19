import React from "react";
import { CgCornerDownRight } from "react-icons/cg";
export default function QandAcard({ items }) {
  return (
    <>
      {!items.length ? (
        <div className="flex ml-2 items-center text-lg">
          <CgCornerDownRight />
          <span className="ml-2 italic text-gray-400">
            Aún no hay Preguntas. Haz una para obtener más información.
          </span>
        </div>
      ) : (
        <>
          {items.map((element) => {
            return (
              <div key={element.id} className=" space-y-1 px-4">
                <p>{element.question}</p>
                {element.answer && (
                  <div className="flex ml-2 items-center">
                    <CgCornerDownRight />
                    <span className="ml-2 text-gray-400">{element.answer}</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
