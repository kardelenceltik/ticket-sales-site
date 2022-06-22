import axios from "axios";
import React, { useEffect, useState } from "react";
import ActivityCart from "./ActivityCart";
import ActivityTypeDropdown from "./ActivityTypeDropdown";
const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const getActivity = () => {
    axios.get("http://localhost:7070/activity/get").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  };
  const applyFilterByType = (typeName) => {
    const elements = document.querySelectorAll(
      `.activity-card:not([data-type='${typeName}'])`
    );
    const activityTypeElements = document.querySelectorAll(".activity-card");
    activityTypeElements.forEach((activityTypeElement) => {
      activityTypeElement.classList.remove("d-none");
    });
    elements.forEach((element) => {
      element.classList.add("d-none");
    });
  };
  useEffect(() => {
    getActivity();
  }, []);
  return (
    <div className="container mt-3">
      <ActivityTypeDropdown applyFilterByType={applyFilterByType} />
      <div className="row ">
        {activities.map((activity) => {
          return (
            <ActivityCart
              key={activity._id}
              activityType={activity.activityType}
              activityName={activity.name}
              activityPhoto={activity.photo[0]}
              activityId={activity._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ActivitiesPage;
