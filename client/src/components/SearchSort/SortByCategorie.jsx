import React, { useEffect } from "react";
import {
  getCategories,
  filteredCat,
} from "../../actions/action-talents/talents";
import { useDispatch, useSelector } from "react-redux";
import { FilteredCat } from "./FilteredCat";

export default function SortByCategorie() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.mislice.categories);
  useEffect(() => {
    const getCat = () => {
      dispatch(getCategories());
    };
    getCat();
  }, [dispatch]);

  const handleCatFilter = (e) => {
    e.preventDefault();
    dispatch(filteredCat(e.target.value));
  };
  return (
    <div className="p-2 bg-dark rounded-lg shadow-lg hover:scale-105 duration-300 ">
      <label className="block text-lg font-semibold text-center text-white mb-2">Categorias: </label>
      <select
        className="w-[190px] xxl:w-[250px] text-center text-black border-2 border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 "
        onChange={handleCatFilter}
      >
        {categories?.map((e, index) => (
          <FilteredCat key={index} category={e.title} />
        ))}
      </select>
    </div>
  );
}
