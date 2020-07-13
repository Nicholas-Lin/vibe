import React from "react";
import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel(props) {
  const carouselItems = props.images.map((image) => (
    <Carousel.Item key={image.id}>
      <img src={image.url} alt="album cover" />
    </Carousel.Item>
  ));
  return (
    <Carousel indicators={false} controls={true} fade={false} interval={5000}>
      {carouselItems}
    </Carousel>
  );
}
