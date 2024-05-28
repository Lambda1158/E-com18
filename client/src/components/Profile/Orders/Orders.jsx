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
    <div className="border-b-2 text-white border-white shadow-md">
      <h2 className=" underline text-2xl font-semibold tracking-wider mb-4 shadow-xl w-fit transform hover:scale-110 duration-200">
        Ventas de Talentos
      </h2>
      {order?.compras.length > 0 ? (
        <table className="mb-4 border-2 border-white rounded-lg w-full shadow-xl bg-semidark ">
          <thead>
            <tr className=" border-2 border-white p-4 ">
              <th className=" w-[600px] font-normal text-xl">Talento</th>
              <th className=" w-[350px] font-normal text-xl">
                Numero de orden
              </th>
              <th className=" w-[200px] font-normal text-xl">Estado</th>
              <th className=" w-[200px] font-normal text-xl">Monto</th>
            </tr>
          </thead>
          <tbody>
            {order?.compras.map((item, index) => (
              <tr key={index} className="border-2 border-white ">
                <td className=" border-2 border-white py-2 px-4 text-center ">
                  {item?.title}
                </td>
                <td className=" border-2 border-white text-center ">
                  N: {item?.id.slice(10)}
                </td>
                <td className=" border-2 border-white text-center ">
                  {item?.status}
                </td>
                <td className=" border-2 border-white text-center ">
                  ${item?.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className=" bg-semidark p-8 rounded shadow-xl w-full">
          <h2 className="text-3xl font-medium text-white mb-4">
            Disculpanos 😓
          </h2>
          <p className="text-white text-xl">
            Perdon no tienes ventas sobre tus post ...
          </p>
        </div>
      )}
    </div>
  );
}
