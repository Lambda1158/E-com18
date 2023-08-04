import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReviewbyId } from "../../../actions/index";
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const review = useSelector((state) => state.index.review);

  useEffect(() => {
    dispatch(getReviewbyId(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col justify-center border-2 text-white border-white rounded-lg w-11/12 pt-4">
      <Table>
        <Thead>
          <Tr>
            <Th>Talento</Th>
              <Th>Usuario</Th>
              <Th>Puntaje</Th>
          </Tr>
        </Thead>
        <Tbody className="bg-semidark rounded-lg">
          {
          !(review.posts?.length > 0) ? (
          <Td>No tienes publicaciones para obtener reseñas...</Td>
        ) : review.posts[0].reviews.length > 0 ? (
          review.posts.map((e) => (
            <Tr>
              <Td className="p-2">{e.title}</Td>
              <Td className="px-2 font-black italic">{e.reviews[0]?.user?.username}</Td>
              <Td>{e.reviews[0]?.qualification}</Td>
            </Tr>
          ))
        ) : (
          <h1>No tienes reseñas por el momento...</h1>
        )}
        </Tbody>
      </Table>
      </div>
  );
}
