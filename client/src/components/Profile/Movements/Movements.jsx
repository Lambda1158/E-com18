import React from "react";
import CompraCard from "./CompraCard"
export default function Movements({ sales }) {
  console.log(sales);
  const formatDia = (param) => {
    const dia = new Date(param);
    return `${dia.getUTCDate()}/${
      dia.getUTCMonth() + 1
    }/${dia.getUTCFullYear()}`;
  };
  if (sales.message) return null;
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <h2 className="text-3xl font-normal mb-6 cursor-default ">
        Compras de Talentos
      </h2>
	  <div className="flex flex-wrap gap-6 justify-center">
      {sales.map((purchase) => (
        <CompraCard key={purchase.id} purchase={purchase} />
      ))}
    </div>
    </div>
  );
}
