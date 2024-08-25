import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// Desktop Images
import laptop from "../assest/banner/laptop.png";
import lcd from "../assest/banner/lcd.png";
import headphone from "../assest/banner/headphone.png";

const Carousel = () => {
  const items = [
    <img src={laptop} alt="Image 1" className="" />,
    <img src={lcd} alt="Image 2" className="" />,
    <img src={headphone} alt="Image 3" className="" />,
  ];

  return (
    <AliceCarousel
      autoPlay
      autoPlayInterval={2000}
      animationDuration={500}
      animationType="fadeout"
      infinite
      disableButtonsControls
      disableDotsControls
      items={items}
    />
  );
};

export default Carousel;
