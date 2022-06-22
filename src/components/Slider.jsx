import React from "react";

const Slider = ({ photos }) => {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {photos.map((photo, index) => {
            if (index == 0) {
              return (
                <div className="carousel-item active">
                  <img
                    src={photo}
                    style={{ height: "500px" }}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              );
            } else {
              return (
                <div className="carousel-item">
                  <img
                    src={photo}
                    className="d-block w-100"
                    style={{ height: "500px" }}
                    alt="..."
                  />
                </div>
              );
            }
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Slider;
