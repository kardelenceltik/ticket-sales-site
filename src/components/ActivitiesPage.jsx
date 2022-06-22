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
      axios.get("http://localhost:7070/activity/get").then((response) => {
        let tempPlace = [];
        response.data.forEach((activity) => {
          var isExist = tempPlace.includes(activity.address);
          if (!isExist) {
            tempPlace.push(activity.address);
          }
        });
        setPlaces(tempPlace);
      });
    } else {
      getActivity();
    }
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <ActivityTypeDropdown applyFilterByType={applyFilterByType} />
        </div>
        <div className="col-4">
          <input
            type="date"
            onChange={(e) => setCurrentDate(e.target.value)}
            className="form-control"
            id="filter-date"
          />
        </div>
        <div className="col-4">
          <select
            id="place-area"
            className="form-control form-select"
            onChange={(e) => setCurrentPlace(e.target.value)}
          >
            {places.map((place) => {
              return <option value={place}>{place}</option>;
            })}
          </select>
        </div>
      </div>

      <button
        onClick={applyAllFilterForActivite}
        className="btn btn-dark mt-3 form-control"
      >
        Apply Filter
      </button>
      <h4 className="text-center mt-5">Activities</h4>
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
      <h4 className="text-center">Old Activities</h4>
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
