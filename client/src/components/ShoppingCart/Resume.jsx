import React from "react";
export default function Resume({ carrito }) {
  return (
    <section className="shadow-2xl h-fit">
      <div>
        <div>
          <h2 className="p-4 text-xl">Resumen de compra</h2>
        </div>
        <div className="border-t-4 p-4">
          <div className="flex justify-between">
            <p className="">Productos ({carrito.length})</p>
            <p>
              {Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "ARG",
              }).format(
                carrito.reduce((acc, current) => {
                  return acc + current.cost * current.quantity;
                }, 0)
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Envio</p>
            <p>Gratis</p>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>
              {Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "ARG",
              }).format(
                carrito.reduce((acc, current) => {
                  return acc + current.cost * current.quantity;
                }, 0)
              )}
            </p>
          </div>
		  <button className="mt-8 bg-dark text-white w-full text-left rounded-sm text-xl hover:scale-110 duration-300 p-4">Comprar ahora</button>
        </div>
      </div>
    </section>
  );
}
