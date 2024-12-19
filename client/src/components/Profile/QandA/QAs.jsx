import React from "react";
import QandAcard from "./QandAcard";
export default function Qas({ qa }) {
  if (!qa.length) return null;
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <h2 className="text-3xl font-normal mb-4 cursor-default ">Preguntas</h2>
      <section className="xxl:flex xxl:gap-16 overflow-x-auto  scrollbar-custom py-2 px-2">
        {qa.map((item) => {
          return <QandAcard key={item.id} question={item} />;
        })}
      </section>
    </div>
  );
}
