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
      <div className="container">
        <div className="card card shadow-sm bg-white rounded ">
          <h3 className="text-center text-dark">{activity?.name}</h3>

          <div className="card-header">
            {activity && <Slider photos={activity?.photo} />}
          </div>
        </div>

        <div className="row">
          <div className="col-5">
            <div className=" card pt-4 mt-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h6>Artists: </h6>
                  {activity?.actors.map((actor) => {
                    return (
                      <li key={actor}>
                        <span className="badge badge-success"> {actor}</span>
                      </li>
                    );
                  })}
                  <hr />
                  <h6>Pricing : </h6>
                  <ul>
                    {chairPricing?.categories?.map((category) => {
                      return (
                        <li>
                          {category.name} : {category.price} ??? <br />
                          <span className="badge badge-danger">
                            Stock{" "}
                          </span> :{" "}
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
            <div className="card mt-4">
              <div className="card-header">
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
