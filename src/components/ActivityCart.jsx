import React from "react";
import { useNavigate } from "react-router";

const ActivityCart = ({
  activityType,
  activityName,
  activityPhoto,
  activityId,
}) => {
  const navigate = useNavigate();
  const detailPageRedirectHandler = () => {
    navigate(`detail?id=${activityId}`);
  };
  return (
    <div
      className="col-4 mt-4 activity-card"
      onClick={detailPageRedirectHandler}
      data-type={activityType}
    >
      <div className="card">
        <img src={activityPhoto} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{activityName}</h5>
          <p className="card-text">{activityType}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCart;
