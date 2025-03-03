import React from "react";
import SortByPrice from "./SortByPrice";
import SortByCategorie from "./SortByCategorie";
import Search from "./Search";
export default function SearchSort() {
  return (
    <section className="grid grid-cols-[60%_40%] w-10/12 mx-auto py-4">
      <Search />
      <div className="flex justify-around items-center ">
        <SortByPrice />
        <SortByCategorie />
      </div>
    </section>
  );
}
