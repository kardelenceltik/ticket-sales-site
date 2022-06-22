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
    <div>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          {photoUrls.map((photoUrl, index) => {
            if (index === 0) {
              return (
                <div class="carousel-item active">
                  <img class="d-block w-100" src={photoUrl} alt="First slide" />
                </div>
              );
            } else {
              return (
                <div class="carousel-item ">
                  <img class="d-block w-100" src={photoUrl} alt="First slide" />
                </div>
              );
            }
          })}
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
