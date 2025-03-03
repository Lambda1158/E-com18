import React from "react";

export function FilteredCat(props) {
  return (
    <option className=" " value={props.category}>
      {props.category}
    </option>
  );
}
