import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTalentById } from "../../../actions/action-talents/talents";
import { agregarCarrito } from "../../../actions/action-talents/carrito";
import { getPostQuestion } from "../../../actions/action-talents/review";
import { clearT } from "../../../actions/talentreducer";
export default function useSeeMore(id) {
  const dispatch = useDispatch();
  const seemore = useSelector((state) => state.mislice.moreTalent);
  const user = useSelector((state) => state.user.user.id);
  const review = seemore.reviews;
  const question = useSelector((state) => state.review.questionsPost);
  useEffect(() => {
    const getTalent = () => {
      dispatch(getTalentById(id));
    };
    const getQuestion = () => {
      dispatch(getPostQuestion(id));
    };
    getTalent();
    getQuestion();
    return () => {
      dispatch(clearT());
    };
  }, [dispatch, id]);

  const addCarrito = () => {
    dispatch(agregarCarrito(seemore));
  };

  return { seemore, user, addCarrito, review, question };
}
