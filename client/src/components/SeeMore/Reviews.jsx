import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostReview, PROXY } from "../../actions/index";
import axios from "axios";
import StarsRating from "../Home/Star";

export default function Reviews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const review = useSelector((state) => state.reviewSliceReducer.review);
  const orders = useSelector((state) => state.userSliceReducer.profile);
  const user = useSelector((state) => state.userSliceReducer.user);
  const [refresh, setRefresh] = useState(false);
  const [buyPost, setBuyPost] = useState();
  const [newReview, setNewReview] = useState({
    qualification: "",
    description: "",
    user_id: user.id,
    post_id: id,
  });

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
    <div className="m-3">
      <h3 className="text-xl font-semibold">Reviews del talento</h3>
      {review?.reviews?.length > 0 ? (
        <div className="w-min-full" display="flex" mt="2" alignItems="center">
          <div as="span" ml="2" color="gray.600" fontSize="sm">
            {review?.reviews ? (
              review?.reviews?.map((e, index) => (
                <div key={index} className="bg-light mb-2 rounded-md">
                  <StarsRating rating={e.qualification} />
                  {e?.description}
                </div>
              ))
            ) : (
              <span>No han dejado ningún comentario</span>
            )}
          </div>
        </div>
      ) : (
        <span>Esta publicación no tiene reviews por el momento</span>
      )}
      <hr />

      {buyPost ? (
        <div className="m-3">
          <h3 className="text-xl font-semibold">
            Deja tu reseña sobre este curso para ayudar a las demas personas
          </h3>
          <form>
            <input
              value={newReview.description}
              name="description"
              onChange={(e) => handleChange(e)}
              placeholder="Ingrese su reseña"
              size="md"
              required
            />
            <input
              type="number"
              value={newReview.qualification}
              name="qualification"
              placeholder="Calificación (Min. 1 - Max. 5)"
              min="1"
              max="5"
              onChange={(e) => handleChange(e)}
              required
            />
            <button onClick={(e) => onClick(e)}>Enviar</button>
          </form>
        </div>
      ) : (
        <br />
      )}
    </div>
  );
}
