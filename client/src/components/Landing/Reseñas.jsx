import React, { useEffect } from "react";
import RESEÑAS from "./MOCKUP";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTalents } from "../../actions";

function Reseñas() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTalents);
  }, [dispatch]);
  const talents = useSelector(state=> state.mislice.talents)
  
  let review = talents.reduce((acc,elementoActual)=>{
	return acc.concat(elementoActual.reviews)
  },[])
  let aux = []
  review.forEach(element=>{
	aux.push({user:{username:element.userId,reseña:element.description}})
  })
  aux=aux.concat(RESEÑAS)

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "bg-semilight flex flex-row",
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "0px",
  };

  return (
    <Slider {...settings}>
      {aux.map((el, index) => (
        <div key={index} className="bg-semilight">
          <h1 className=" text-center text-dark text-2xl font-semibold py-2">
            -{el.user.username}
          </h1>
          <p className="text-center text-xl font-normal p-4 mb-2">
            {el.user.reseña}
          </p>
        </div>
      ))}
    </Slider>
  );
}

export default Reseñas;
