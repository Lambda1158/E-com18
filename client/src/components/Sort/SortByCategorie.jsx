import React, { useEffect } from "react";
import { getCategories, sortByPrice, getTalentByRating } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { FilteredCat } from "./FilteredCat";
import { filteredCat } from "../../actions";

export const SortByCategorie = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.mislice.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const handleCatFilter = (e) => {
    e.preventDefault();
    dispatch(filteredCat(e.target.value));
  };
  return (
    <div className="">
      <label className="text-2xl font-semibold">Categorias: </label>
      <select
        className="w-[200px] bg-semidark text-white border-2 border-black"
        onChange={handleCatFilter}
      >
        {categories?.map((e, index) => (
          <FilteredCat key={index} category={e.title} />
        ))}
      </select>
    </div>
  );
};
