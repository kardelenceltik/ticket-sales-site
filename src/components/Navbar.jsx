import React from "react";
import { useNavigate } from "react-router";
const Navbar = () => {
  const navigate = useNavigate();

  const redirectUrlHandler = (redirectLink) => {
    navigate(redirectLink);
  };
  const searchApplyFilter = (e) => {
    if (e.keyCode == 13) {
      const inputValue = e.target.value;
      navigate("/activities?inputValue=" + inputValue);
      window.location.reload();
    }
  };
  return (
    <div>
      <div className="navbar fixed-top">
        <div className="logo" onClick={() => redirectUrlHandler("/")}>
          <h1>Ticket</h1>
        </div>
        <div className="input-area">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onKeyUp={(e) => searchApplyFilter(e)}
            />
          </div>
        </div>
        <div className="nav__links">
          <a
            href="#"
            onClick={() => redirectUrlHandler("/")}
            className="active nav__link"
          >
            Home
          </a>

          <a
            href="#"
            onClick={() => redirectUrlHandler("/activities")}
            className="nav__link"
          >
            Activities
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
