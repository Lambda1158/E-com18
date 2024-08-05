import React from "react";

export function FilteredCat(props) {
  return (
    <option className=" w-4 border-2 border-black" value={props.category}>
      {props.category}
    </option>
  );
}
