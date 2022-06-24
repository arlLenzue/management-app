import React from "react";
import { Zoom } from "react-slideshow-image";
import "./SlideShow.css";

const Slideshow = (props) => {
  const employees = props.employees;

  const featureEmployee = employees.filter(
    (employee) => employee.isFeatured !== false
  );

  const images = featureEmployee.map((employee) => employee.photo);

  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
            <img alt={index} key={index} src={each} />
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;
