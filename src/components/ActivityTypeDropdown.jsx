import axios from "axios";
import React, { useEffect, useState } from "react";

const ActivityTypeDropdown = ({ applyFilterByType }) => {
  const [activityTypes, setActivityTypes] = useState([]);
  const getActivityType = () => {
    axios
      .get("http://localhost:7070/activityType/get-by-row-status")
      .then((response) => {
        console.log(response);
        setActivityTypes(response.data);
      });
  };
  useEffect(() => {
    getActivityType();
  }, []);
  return (
    <div>
      <select
        onChange={(e) => applyFilterByType(e.target.value)}
        className="form-control"
      >
        {activityTypes.map((activityType) => {
          return (
            <option key={activityType._id} value={activityType.name}>
              {activityType.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ActivityTypeDropdown;
