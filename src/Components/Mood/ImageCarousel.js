import React from "react";
import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel(props) {
  const carouselItems = props.images.map((image) => (
    <Carousel.Item key={image.key}>
      <img src={image.url} alt="album cover" />
    </Carousel.Item>
  ));
  return (
    <Carousel
      indicators={false}
      controls={false}
      fade={false}
      interval={props.pause ? null : 5000}
      onSelect={(e) => props.handleSlide(e)}
      activeIndex={props.activeIndex}
    >
      {carouselItems}
    </Carousel>
  );
}
