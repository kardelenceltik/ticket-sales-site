import axios from "axios";
import React, { useEffect, useState } from "react";
import ActivityCart from "./ActivityCart";
import { useSearchParams } from "react-router-dom";
import ActivityTypeDropdown from "./ActivityTypeDropdown";
const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentPlace, setCurrentPlace] = useState("");
  const [oldActivities, setOldActivities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [places, setPlaces] = useState([]);
  const getActivity = async () => {
    await axios.get("http://localhost:7070/activity/get").then((response) => {
      let tempPlace = [];
      response.data.forEach((activity) => {
        var isExist = tempPlace.includes(activity.address);
        if (!isExist) {
          tempPlace.push(activity.address);
        }
      });
      setPlaces(tempPlace);

      setActivities(response.data);
    });
  };
  const getOldActivity = () => {
    axios
      .get("http://localhost:7070/activity/get-old-activity")
      .then((response) => {
        setOldActivities(response.data);
      });
  };

  const applyAllFilterForActivite = () => {
    axios.get("http://localhost:7070/activity/get").then((response) => {
      const filteredActivities = response.data.filter(
        (x) =>
          x.startDate.toString().split("T")[0] === currentDate &&
          x.activityType === currentType &&
          x.address == currentPlace
      );
      setActivities(filteredActivities);
    });
  };
  const applyFilterByType = (typeName) => {
    setCurrentType(typeName);
  };
  useEffect(() => {
    getOldActivity();
    const queryStringValue = searchParams.get("inputValue");
    if (queryStringValue) {
      axios
        .get(
          "http://localhost:7070/activity/get-activity-by-like?likeValue=" +
            queryStringValue
        )
        .then((response) => {
          setActivities(response.data);
        });
    } else {
      getActivity();
    }
  }, []);
  return (
    <div className="container mt-3">
      <ActivityTypeDropdown applyFilterByType={applyFilterByType} />
      <input
        type="date"
        onChange={(e) => setCurrentDate(e.target.value)}
        className="form-control"
        id="filter-date"
      />
      <select
        id="place-area"
        className="form-control form-select"
        onChange={(e) => setCurrentPlace(e.target.value)}
      >
        {places.map((place) => {
          return <option value={place}>{place}</option>;
        })}
      </select>
      <button
        onClick={applyAllFilterForActivite}
        className="btn btn-outline-primary"
      >
        Apply Filter
      </button>
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
      <hr />
      <h6>Old Activities</h6>
      <div className="row ">
        {oldActivities.map((activity) => {
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
