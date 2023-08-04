import React from "react";

export function FilteredCat(props){
    return (
         <option value={props.category}>
            {props.category}
        </option>
           )
    };