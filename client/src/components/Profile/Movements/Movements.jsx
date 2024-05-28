import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../../actions/index";

export default function Movements() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const sales = useSelector((state) => state.mislice.sales);
  useEffect(() => {
    dispatch(getSales(id));
  }, [dispatch, id]);
  console.log(sales);
  const formatDia = (param) => {
    let dia = new Date(param);
    return `${dia.getUTCDate()}/${
      dia.getUTCMonth() + 1
    }/${dia.getUTCFullYear()}`;
  };
  return (
    <div className="border-b-2 text-white border-white w-full py-4 shadow-xl">
      <h2 className="underline text-2xl font-semibold tracking-wider mb-4 shadow-xl w-fit transform hover:scale-110 duration-200">
        Compras de Talentos
      </h2>
      {sales?.length > 0 ? (
        <table className=" shadow-lg">
          <thead>
            <tr className="bg-semidark">
              <th className="font-medium text-lg p-2 w-[15%]">
                Talento Comprado
              </th>
              <th className="font-medium text-lg w-[15%]">Numero de orden</th>
              <th className="font-medium text-lg w-[30%]">
                Informacion del Talento
              </th>
              <th className="font-medium text-lg w-[10%]">Monto</th>
              <th className="font-medium text-lg w-[10%]">Rating</th>
              <th className="font-medium text-lg w-[10%]">Fecha de Compra</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((item, index) => (
              <tr
                key={index}
                className="bg-semidark border space-x-6 border-white w-11/12 h-12 m-2"
              >
                <td className="font-light text-center text-base">
                  {item?.post.title}
                </td>
                <td className="font-light text-center text-base ">
                  N: {item?.id.slice(0, 13)} ...
                </td>
                <td className="font-light text-center text-base">
                  {item?.post.description.slice(0, 90)} ...
                </td>
                <td className="font-light text-center text-base ">
                  ${item?.price}
                </td>
                <td className="font-light text-center text-base ">
                  {item?.post.rating}
                </td>
                <td className="font-light text-center text-base ">
                  {formatDia(item?.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className=" bg-semidark p-8 rounded shadow-xl w-full">
          <h2 className="text-3xl font-medium text-white mb-4">
            Por favor perdone 😓
          </h2>
          <p className="text-white text-xl">
            Pero no tienes conpras de talentos ...
          </p>
        </div>
      )}
    </div>
  );
}
