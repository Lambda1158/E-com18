import React from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostReview, PROXY } from "../../actions/index";
import axios from "axios";

export default function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const review = useSelector((state) => state.index.review);
  const orders = useSelector((state) => state.index.profile);
  const user = useSelector((state) => state.index.user);
  const [refresh, setRefresh] = useState(false);
  const [buyPost, setBuyPost] = useState();
  const [newReview, setNewReview] = useState({
    qualification: "",
    description: "",
    user_id: user.id,
    post_id: id,
  });
  const toast = useToast();

  useEffect(() => {
    dispatch(getPostReview(id));
    setRefresh(false);
  }, [refresh, dispatch, id]);

  useEffect(() => {
    let buy = orders.orders?.find((o) => o.postId === id);
    setBuyPost(buy);
  }, [id, orders.orders]);

  async function onClick(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${PROXY}/review`, newReview);
      console.log(res);
      console.log(newReview);
      setRefresh(true);
      setNewReview({
        qualification: "",
        description: "",
        user_id: user.id,
        post_id: id,
      });
    } catch (error) {
      console.log(error);
    }
    toast({
      title: "Reseña enviada",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
    console.log(newReview);
  }

  return (
    <div class="m-3">
      <h3 class="text-xl font-semibold">Reviews del talento</h3>
      {review?.reviews?.length > 0 ? (
        <Box class="w-min-full" display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {review?.reviews ? (
              review?.reviews?.map((e) => (
                <div class="bg-light mb-2 rounded-md">
                  <div>
                    {[...Array(5)].fill("").map((_, i) => (
                      <StarIcon
                        key={i}
                        color={
                          i <= e.qualification - 1 ? "teal.500" : "gray.300"
                        }
                      />
                    ))}
                  </div>
                  {e?.description}
                </div>
              ))
            ) : (
              <span>No han dejado ningún comentario</span>
            )}
          </Box>
        </Box>
      ) : (
        <span>Esta publicación no tiene reviews por el momento</span>
      )}
      <hr />

      {buyPost ? (
        <div class="m-3">
          <h3 class="text-xl font-semibold">
            Deja tu reseña sobre este curso para ayudar a las demas personas
          </h3>
          <form>
            <Input
              value={newReview.description}
              name="description"
              onChange={(e) => handleChange(e)}
              placeholder="Ingrese su reseña"
              size="md"
              required
            />
            <Input
              type="number"
              value={newReview.qualification}
              name="qualification"
              placeholder="Calificación (Min. 1 - Max. 5)"
              min="1"
              max="5"
              onChange={(e) => handleChange(e)}
              required
            />
            <Button onClick={(e) => onClick(e)}>Enviar</Button>
          </form>
        </div>
      ) : (
        <br />
      )}
    </div>
  );
}
