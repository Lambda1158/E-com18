import React from "react";
import { getTalentByRating } from '../../actions';
import { useDispatch } from 'react-redux';

export function SortByQuali(){
    const dispatch = useDispatch();

    function handleSort(e){
        e.preventDefault();
        dispatch(getTalentByRating(e.target.value))
    };

    return (
        <div>
        <label class='font-semibold'>Calificación: </label>
        <select onChange={(e) => handleSort(e)}>
            <option value='asc'>Baja</option>
            <option value='desc'>Alta</option>
        </select>
       </div>
    )
};