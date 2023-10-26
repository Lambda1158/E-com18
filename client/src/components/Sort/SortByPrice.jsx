import React from "react";
import { sortByPrice, getTalentByRating } from "../../actions";
import { useDispatch } from "react-redux";

export const SortByPrice = () => {
  const dispatch = useDispatch();

  function onChange(e) {
    e.preventDefault();
    if (e.target.value.length < 5) {
      dispatch(getTalentByRating(e.target.value));
    }
    dispatch(sortByPrice(e.target.value));
    console.log();
  }

  return (
    <div>
      <label className="font-semibold">Ordenar por: </label>
      <select onChange={onChange}>
        <option value="descendente">Mayor precio</option>
        <option value="ascendente">Menor precio</option>
        <option value="asc">Baja</option>
        <option value="desc">Alta</option>
      </select>
    </div>
  );
};
