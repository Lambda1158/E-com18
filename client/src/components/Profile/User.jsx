import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserbyId } from '../../actions';
import defaultImage from '../../assets/profile_default.png'
//import { Box, Image, Button } from '@chakra-ui/react';

export default function Profile({modal}){

    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.index.profile)
    
    useEffect(() => {
        dispatch(getUserbyId(id));
    },[modal,id,dispatch])

    function handleOnClick(e){
        e.preventDefault();
        modal(true);
    }

    return(
        <div>
        {!user ? (<h2>Cargando...</h2>) : (
        <div className='flex flex-col items-center py-10 px-8 bg-dark border-2 text-white border-white rounded-lg space-y-6 '>
            <div>
                <div>
                    <img className='rounded-full border-4 border-semilight w-72' src={user.image? user.image : defaultImage} alt={user.username}/>
                </div>
                <div className='flex opacity-30 relative bottom-14 left-52 justify-center items-center w-12 h-12 bg-gray rounded-full shadow-xl hover:opacity-100 duration-70'>
                    <button  onClick={(e) => handleOnClick(e)}><img width='44px' heigth='44px' src='https://codes.unidepix.com/img/photo.svg' alt='userpic' /></button>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <h4 className='text-2xl font-medium italic underline'>{user.fullName}</h4>
                <h5 className='text-xl text-gray'>{user.username}</h5>
            </div>
            {/* <div className='flex items-center w-full h-6 bg-dark border border-white rounded-md'>
                <div className='flex flex-row items-center h-5 w-9/12 bg-purple rounded-md'>
                    <div className='flex justify-center text-xs ml-2 font-medium'>
                        Nivel 5
                    </ div>
                </div>
            </div> */}
            {/* <div>
                <p className='font-medium'>Usuario desde:</p>
                <p> {user.createdAt.slice(0, 10)}</p>
            </div> */}
            <div className='flex flex-col justify-start space-y-6'>

            {/* <Box overflowY='scroll' maxH="100px">
            <label class="text-lg" >Sobre mi: {user.resume}</label>
                            <textarea 
                                onChange={handleOnChange} 
                                className="resize-none overflow-y-auto justify-self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 text-center p-8"  
                                name="description" 
                                rows="11" cols="25"  
                                //placeholder=" Sobre mi..." 
                                required
                                />
                                <div>
                                <button onSubmit={(e) => onSubmit(e)}className="btn-primary btn-colors"> Agregar </button>
                                </div>
             </Box> */}

             <div>
                <p className='font-medium'>Usuario desde:</p>
                <p> {user.createdAt.slice(0, 10)}</p>
            </div>

                <div>
                    <p className='font-medium'>Sobre mi: </p>
                    <p>{user.resume}</p>
                </div>

                <div>
                    <p>{user.country}</p>
                </div>
                {/* <div>
                    <p>{user.id}</p>
                </div>
                <div>
                    <h5 className='font-medium'>Idiomas:</h5>
                    <p>Español 	&#127466;&#127480;, Inglés &#127482;&#127480;, Japonés &#127471;&#127477;</p>
                </div>
                <h5 className='font-medium'>Métodos financieros asociados:</h5>
                <div className='flex'>
                    <button><img className='h-6 bg-semilight rounded border-2 border-semilight mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/card.png'/></button>
                    <button><img className='h-6 bg-semilight rounded border-2 border-semilight mr-2' alt='Paypal logo' src='https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'/></button>
                    <button><img className='h-6 bg-semilight rounded border-2 border-semilight mr-2' alt='MercadoPago logo' src='http://codes.unidepix.com/img/mercadopago.png'/></button>    
                </div> */}
                    <h5 className='font-medium'>Redes sociales</h5>
                <div>
                    <button><img className='w-7 h-7 mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/></button>
                    {/* {!user.social ? '' : (<button><img className='w-7 h-7 mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/></button>)} */}
                    <button><img className='w-7 h-7 mr-2' alt='Google logo' src='http://codes.unidepix.com/img/google.svg'/></button>
                    
                </div>
            </div>
        </div>
        )}
        </div>
    )
}