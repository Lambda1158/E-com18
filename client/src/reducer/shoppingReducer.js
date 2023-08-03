import { ADD_TO_CART, REMOVE_ONE_FROM_CART, CLEAR_CART } from "../actions/shoppingActions";
// import { GET_TALENT_BY_ID } from '../actions/index'

export const shoppingInicialState = {
    cart: [],
}

export default function shoppingReducer(state = shoppingInicialState, action) {
    switch(action.type) {

        case ADD_TO_CART:
            let itemInCart = state.cart.find(item => item.id === action.payload.id)
            
            return itemInCart ? {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload.id ? {...item, quantity: item.quantity} : item )
            }
            :
            {
                ...state,
                cart: [...state.cart, {...action.payload, quantity:1}]} 

        case REMOVE_ONE_FROM_CART:
            // let itemToDelete = state?.cart?.find(item => item.id === action.payload)
            // return itemToDelete?.quantity > 1 ? {
            //     ...state,
            //     cart: state?.cart?.map((item) => item?.id === action.payload ? {...item, quantity: item?.quantity -1} : item)
            // } 
            // : 
            // {
            //     ...state,
            //     cart: state?.cart?.filter((item) => item?.id !== action.payload)
            // }
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload)
            }
            
        case CLEAR_CART:
            return shoppingInicialState

        default:
            return state
    }
}