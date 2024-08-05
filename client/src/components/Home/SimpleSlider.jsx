import React, { useState } from "react";
import TalentCard from "./TalentCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = ({ items }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="">
      <Slider {...settings}>
        {items?.map((talent) => {
          return (
            <TalentCard
              key={talent.id}
              category={talent?.category?.title}
              id={talent.id}
              username={talent?.user?.username}
              title={talent.title}
              description={talent.description}
              image={talent.image}
              cost={talent.cost}
              rating={talent.rating}
              reviews={talent.reviews}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
