import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchTalent } from "../../actions/action-talents/talents";

export default function Search() {
  const dispatch = useDispatch();
  function debounce(func, delay) {
    let timeId;
    return function (...args) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  // eslint-disable-next-line 
  const debounceSubmit = useCallback(
    debounce((value) => {
      dispatch(searchTalent(value));
    }, 1000),
    []
  );

  function onChange(e) {
    e.preventDefault();
    const value = e.target.value.trim();
    debounceSubmit(value);
  }

  return (
    <section className="bg-dark flex justify-center rounded-lg p-2">
      <div className=" flex flex-row p-4 justify-between w-full items-center gap-4 px-4">
        <input
          onChange={onChange}
          type="search"
          className="h-10 w-full pl-5 rounded  focus:shadow focus:outline-none pr-4"
          placeholder="Busca algun curso..."
        />
        <button
          type="submit"
          className="hover:scale-125 hover:ml-2 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 ml-2 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            alt="Alternative text"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
