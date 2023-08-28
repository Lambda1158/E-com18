import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovebyId, getSales } from '../../../actions/index';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function Movements(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSliceReducer.profile)
    const sales = useSelector((state) => state.misliceReducer.sales)
    console.log("VENTAS", sales)
    console.log("USUARIO", user)
    
    useEffect(() => {
        dispatch(getSales(id));
    },[dispatch, id])

    return (
        <div className='flex flex-col items-center border-2 text-white border-white rounded-lg w-11/12 pt-4'>
                <Table>
                    <Thead>
                        <Tr class="bg-semidark">
                            <Th>Talento</Th>
                            <Th>Numero de orden</Th>
                            <Th>Monto</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {sales?.length > 0 ?
                        sales.map((item) => 
                            <Tr className='bg-semidark border space-x-6 border-white w-11/12 h-12 m-2'>
                                <Td>{item?.title}</Td>
                                <Td>{item?.id}</Td>
                                <Td>${item?.price}</Td>
                            </Tr>
                        )
                        :
                        <Td>No hay pedidos para mostrar</Td> 
                    }
                    </Tbody>
                </Table>
        </div>
    )
}