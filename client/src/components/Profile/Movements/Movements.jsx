import React from "react";
import CompraCard from "./CompraCard"
export default function Movements({ sales }) {
  if (sales.message) return null;
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <h2 className="text-3xl font-normal mb-4 cursor-default ">
        Compras de Talentos
      </h2>
	  <div className="flex gap-4 overflow-x-auto scrollbar-custom py-2">
      {sales.map((purchase) => (
        <CompraCard key={purchase.id} purchase={purchase} />
      ))}
    </div>
    </div>
  );
}
