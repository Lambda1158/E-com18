import React from "react";
import OrderCard from "./OrderCard";
export default function Orders({ orders }) {
  if (orders.message) return null
  return (
    <div className="text-white px-4 py-6 bg-dark rounded-lg">
      <h2 className="text-3xl font-normal mb-4 cursor-default ">
        Historial de ventas
      </h2>
      <section className="flex gap-4 overflow-x-scroll scrollbar-custom py-2">
        {orders.map((element) => (
          <OrderCard key={element.id} element={element} />
        ))}
      </section>
    </div>
  );
}
