import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "./Slider";
const ActivityDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activity, setActivity] = useState();
  const [chairPricing, setChairPricing] = useState();
  const getCurrentActivity = () => {
    const activityId = searchParams.get("id");
    axios
      .get(
        `http://localhost:7070/activity/get-activity-by-id?activityId=${activityId}`
      )
      .then((response) => {
        console.log(response);
        response.data.locationHtml = response.data.locationHtml.replace(
          "123movies",
          ""
        );
        setActivity(response.data);
      });
  };
  const getChairPricing = () => {
    const activityId = searchParams.get("id");
    axios
      .get(
        "http://localhost:7070/chair/get-by-activityId?activityId=" + activityId
      )
      .then((response) => {
        console.log(response.data);
        setChairPricing(response.data[0]);
      });
  };
  useEffect(() => {
    getChairPricing();
    getCurrentActivity();
  }, []);
  return (
    <div>
      <div class="container">
        <div class="card">
          <h3 class="text-center">{activity?.name}</h3>

          <div class="card-header">
            {activity && <Slider photos={activity?.photo} />}
          </div>
        </div>

        <div class="row">
          <div className="col-5">
            <div class=" card">
              <ul class="list-group list-group-flush">
                {/* <li class="list-group-item"></li>
                <li class="list-group-item">
                  <h6>Date:</h6>
                </li>
                <li class="list-group-item">
                  <h6>Description:</h6>
                </li> */}
                <li class="list-group-item">
                  <h6>Artists: </h6>
                  {activity?.actors.map((actor) => {
                    return (
                      <li key={actor}>
                        <span className="badge badge-success"> {actor}</span>
                      </li>
                    );
                  })}
                  <h6>Pricing : </h6>
                  <ul>
                    {chairPricing?.categories?.map((category) => {
                      return (
                        <li>
                          {category.name} : {category.price} ₺ <br />
                          <span class="badge badge-danger">Stock </span> :{" "}
                          <span className="baadge badge-danger">
                            {category.stock}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-7">
            <div class="card">
              <div class="card-header">
                <h6 className="text-center">City: {activity?.address}</h6>

                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: activity?.locationHtml
                        .replace(`<a href="https://-to.org">123movies</a>`, "")
                        .replace("how to embed google map", ""),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
