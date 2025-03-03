import React from "react";
import {
  sortByPrice,
  getTalentByRating,
} from "../../actions/action-talents/talents";
import { useDispatch } from "react-redux";
export default function SortByPrice() {
  const dispatch = useDispatch();
  function onChange(e) {
    e.preventDefault();
    if (e.target.value.length < 5) {
      dispatch(getTalentByRating(e.target.value));
    }
    dispatch(sortByPrice(e.target.value));
  }
  return (
	<div className=" p-2 bg-dark rounded-lg shadow-lg hover:scale-105 duration-300 ">
	  <label
		htmlFor="order-select"
		className="block text-lg font-semibold text-center text-white mb-2"
	  >
		Ordenar por:
	  </label>
	  <select
		id="order-select"
		className="w-[190px] xxl:w-[250px] text-center text-black border-2 border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
		onChange={onChange}
	  >
		<option value="descendente">Mayor precio</option>
		<option value="ascendente">Menor precio</option>
		<option value="asc">Review Baja</option>
		<option value="desc">Review Alta</option>
	  </select>
	</div>
  );
}  