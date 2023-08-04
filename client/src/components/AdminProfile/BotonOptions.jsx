
function BotonOptions({estado ,botonClick, value, funcionBorrar, mail}){
    return(
        <div>
          {estado ?
            <button name={mail} value={value} onClick={funcionBorrar}>Eliminar</button> 
            : (
            <div>
                <button name={mail} className="mr-3" value={value} onClick={botonClick}>Aprobar</button>
                <button name={mail} className="ml-3" value={value} onClick={funcionBorrar}>Eliminar</button>
            </div>
            )
          }
        </div>
    )
}

export default BotonOptions;