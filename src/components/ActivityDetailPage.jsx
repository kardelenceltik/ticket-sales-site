import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "./Slider";
const ActivityDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activity, setActivity] = useState();
  const getCurrentActivity = () => {
    const activityId = searchParams.get("id");
    axios
      .get(
        `http://localhost:7070/activity/get-activity-by-id?activityId=${activityId}`
      )
      .then((response) => {
        console.log(response);

        setActivity(response.data);
      });
  };
  useEffect(() => {
    console.log(5);
    getCurrentActivity();
  }, []);
  return (
    <div>
      <div>
        <div class="card">
          <div class="card-header">
            {activity && <Slider photos={activity?.photo} />}
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Name = {activity?.name}</li>
            <li class="list-group-item">
              {activity?.actors.map((actor) => {
                return <li key={actor}>{actor}</li>;
              })}
            </li>
            <li class="list-group-item">Address = {activity?.address}</li>
            <li class="list-group-item">
              {" "}
              <div
                dangerouslySetInnerHTML={{ __html: activity?.locationHtml }}
              ></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
