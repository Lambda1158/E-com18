import React from "react";
import TalentCard from "./TalentCard";
import Slider from "react-slick";

const SimpleSlider = ({ items }) => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    appendDots: (dots) => (
      <div>
        <ul className="relative ml-[1450px] bottom-[370px]">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button className="w-6 h-6 bg-gray-800 rounded-full hover:bg-gray-800 transition"></button>
    ),
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1368,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          appendDots: (dots) => (
            <div>
              <ul className="relative ml-[950px] bottom-[370px]">{dots}</ul>
            </div>
          ),
          customPaging: (i) => (
            <button className="w-6 h-6 bg-gray-800 rounded-full hover:bg-gray-800 transition"></button>
          ),
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {items?.map((talent) => (
        <TalentCard
          key={talent.id}
          category={talent?.category?.title}
          id={talent.id}
          username={talent?.user?.username}
          title={talent.title}
          description={talent.description}
          image={talent.image}
          cost={talent.cost}
          duration={talent.duration}
          rating={talent.rating}
          reviews={talent.reviews}
        />
      ))}
    </Slider>
  );
};

export default SimpleSlider;
