import React from "react";
import Carousel from "react-bootstrap/Carousel";

export function ImageCarousel(props) {
  const carouselItems = props.images.map((image) => (
    <Carousel.Item key={image.id}>
      <img src={image.url} />
    </Carousel.Item>
  ));
  return (
    <Carousel indicators={false} controls={false} fade={false}>
      {carouselItems}
    </Carousel>
  );
}
