import React from "react";

export default function NavAdmin({setPestaña}){

    const onClick = (e) => {
        e.preventDefault();
        setPestaña(e.target.value)
    }

    return(
        <nav className="self-center m-5 text-xl">
            <button className="mx-8 focus:text-dark" onClick={e => onClick(e)} value="user">Usuarios</button>
            <button className="mx-8 focus:text-dark" onClick={e => onClick(e)} value="post">Publicaciones</button>
            <button className="mx-8 focus:text-dark" onClick={e => onClick(e)} value="review">Reviews</button>
        </nav>
    )
}