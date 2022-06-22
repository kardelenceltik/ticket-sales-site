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
    getCurrentActivity();
  }, []);
  return (
    <div>
      {activity && <Slider photos={activity?.photo} />}
      <div dangerouslySetInnerHTML={{ __html: activity?.locationHtml }}></div>
      <div>
        <ul>
          {activity?.actors.map((actor) => {
            return <li key={actor}>{actor}</li>;
          })}
        </ul>
      </div>
      <div>Name = {activity?.name}</div>
      <div>Address = {activity?.address}</div>
    </div>
  );
};

export default ActivityDetailPage;
