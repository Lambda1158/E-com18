import { addCarrito, clearCarrito, removeCarrito } from "../cartreducer"

export const agregarCarrito = (item)=> (dispatch)=>{
	dispatch(addCarrito(item))
}