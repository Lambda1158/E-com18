import React from 'react';
import { useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderbyId } from '../../../actions';
import { Alert, AlertIcon, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function Orders(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.userSliceReducer.order)
    console.log(order.orders, 'order')
    
    useEffect(() => {
        dispatch(getOrderbyId(id));
    },[dispatch, id])

    return(
        <div className='flex flex-col justify-center  border-2 text-white border-white rounded-lg w-11/12 pt-4'>
            <div className='flex flex-col items-center pt-2'>
                <Table>
                    <Thead>
                        <Tr class="bg-semidark">
                            <Th>Talento</Th>
                            <Th>Numero de orden</Th>
                            <Th>Estado</Th>
                            <Th>Monto</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {order?.orders?.length > 0 ?
                        order?.orders.map((item) => 
                            <Tr className='bg-semidark border space-x-6 border-white w-11/12 h-12 m-2'>
                                <Td>{item?.title}</Td>
                                <Td>{item?.id}</Td>
                                <Td>{item?.status}</Td>
                                <Td>${item?.price}</Td>
                            </Tr>
                        )
                        :
                        <Td>No hay pedidos para mostrar</Td> 
                    }
                    </Tbody>
                </Table>
                </div>
            </div>
        // </div>
    )
}