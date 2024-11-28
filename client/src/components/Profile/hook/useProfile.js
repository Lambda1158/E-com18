import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderbyId } from "../../../actions/action-talents/review.js";
import {
  getSales,
  getTalentsfromUser,
} from "../../../actions/action-talents/talents.js";
export default function useProfile(id) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { talentosUsuario } = useSelector((state) => state.mislice);
  const sales = useSelector((state) => state.mislice.sales);
  const {orders} = useSelector((state) => state.review);
  useEffect(() => {
    const getOrder = () => {
      dispatch(getOrderbyId(id));
    };
    const getSalearrow = () => {
      dispatch(getSales(id));
    };
    const fetchTalents = () => {
      dispatch(getTalentsfromUser(id));
    };
    fetchTalents();
    getSalearrow();
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { user, talentosUsuario, sales, orders };
}
