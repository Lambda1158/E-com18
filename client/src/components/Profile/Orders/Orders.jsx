import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOrderbyId } from "../../../actions";

export default function Orders() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrderbyId(id));
  }, [dispatch, id]);
  return (
    <div className="border-b-2 text-white border-white">
      <h2 className=" underline text-2xl font-semibold tracking-wider text-primary mb-4 shadow-xl w-fit">
        Ordenes de Ventas
      </h2>

      <table className="mb-6 border-2 border-white p-4 rounded-lg w-full shadow-xl ">
        <thead>
          <tr className=" border-2 border-white p-4 ">
            <th className=" w-[600px] font-normal text-xl">Talento</th>
            <th className=" w-[350px] font-normal text-xl">Numero de orden</th>
            <th className=" w-[200px] font-normal text-xl">Estado</th>
            <th className=" w-[200px] font-normal text-xl">Monto</th>
          </tr>
        </thead>
        <tbody>
          {order?.compras.length > 0 ? (
            order?.compras.map((item, index) => (
              <tr key={index} className="border-2 border-white ">
                <td className=" border-2 border-white py-2 px-4 text-center ">
                  {item?.title}
                </td>
                <td className=" border-2 border-white text-center ">
                  N{item?.id.slice(10)}
                </td>
                <td className=" border-2 border-white text-center ">
                  {item?.status}
                </td>
                <td className=" border-2 border-white text-center ">
                  ${item?.price}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border-2 border-white text-center">
                No hay pedidos para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
