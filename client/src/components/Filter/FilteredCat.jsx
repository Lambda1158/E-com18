import React from "react";

export function FilteredCat(props) {
  return (
    <option className=" w-4" value={props.category}>
      {props.category}
    </option>
  );
}
