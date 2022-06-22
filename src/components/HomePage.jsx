import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const getPhotoUrlsHandler = () => {
    axios.get("http://localhost:7070/activity/get").then((response) => {
      let tempPhotoUrls = [];
      let responseData = response.data;
      if (responseData) {
        responseData.forEach((activity) => {
          if (activity.photo) {
            activity.photo.forEach((photoUrl) => {
              tempPhotoUrls.push(photoUrl);
            });
          }
        });
      }
      if (tempPhotoUrls && tempPhotoUrls.length > 0) {
        console.log(tempPhotoUrls);
        setPhotoUrls(tempPhotoUrls);
      }
    });
  };
  useEffect(() => {
    getPhotoUrlsHandler();
  }, []);
  return (
    <div className="container">
      <div
        id="carouselExampleControls"
        className="carousel slide "
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {photoUrls.map((photoUrl, index) => {
            if (index === 0) {
              return (
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src={photoUrl}
                    alt="First slide"
                  />
                </div>
              );
            } else {
              return (
                <div className="carousel-item ">
                  <img
                    className="d-block w-100"
                    src={photoUrl}
                    alt="First slide"
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
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="text-center welcome-text">WELCOME</h2>
          <p className="text-center">
            About "Ticket", which has been bringing entertainment and art
            enthusiasts together with events since 2000 as "Turkey's entry point
            to entertainment": The world's leading ticketing company,
            Ticketmaster Family, operating in 21 countries, mainly in North
            America, Europe and the Middle East, under the roof of Live Nation
            Entertainment. is a member.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
