import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOrderbyId } from "../../../actions";

export default function Orders() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.user.order);
  console.log(order);
  useEffect(() => {
    dispatch(getOrderbyId(id));
  }, [dispatch, id]);
  return (
    <div className="flex flex-col justify-center  border-2 text-white border-white rounded-lg w-11/12 pt-4">
      <div className="flex flex-col items-center pt-2">
        <table>
          <thead>
            <tr className="bg-semidark">
              <th>Talento</th>
              <th>Numero de orden</th>
              <th>Estado</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {order?.orders?.length > 0 ? (
              order?.orders.map((item, index) => (
                <tr
                  key={index}
                  className="bg-semidark border space-x-6 border-white w-11/12 h-12 m-2"
                >
                  <td>{item?.title}</td>
                  <td>{item?.id}</td>
                  <td>{item?.status}</td>
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
    </div>
  );
}
