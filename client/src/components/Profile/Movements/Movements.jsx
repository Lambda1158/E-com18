import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovebyId, getSales } from "../../../actions/index";

export default function Movements() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const sales = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(getSales(id));
  }, [dispatch, id]);

  return (
    <div className="border-b-2 text-white border-white w-full py-4">
      <h2 className="text-2xl font-medium pl-4">Ventas</h2>
      <table>
        <thead>
          <tr className="bg-semidark">
            <th>Talento</th>
            <th>Numero de orden</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {sales?.length > 0 ? (
            sales.map((item, index) => (
              <tr
                key={index}
                className="bg-semidark border space-x-6 border-white w-11/12 h-12 m-2"
              >
                <td>{item?.title}</td>
                <td>{item?.id}</td>
                <td>${item?.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No hay pedidos para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
