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
      <div class="navbar fixed-top">
        <div class="logo" onClick={() => redirectUrlHandler("/")}>
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
        <div class="nav__links">
          <a
            href="#"
            onClick={() => redirectUrlHandler("/")}
            class="active nav__link"
          >
            Home
          </a>

          <a
            href="#"
            onClick={() => redirectUrlHandler("/activities")}
            class="nav__link"
          >
            Activities
          </a>
          <a href="#" class="nav__link">
            Contact
          </a>
        </div>
      </div>

      {/* <div id="home" class="section">
        <h1>Home</h1>
      </div>
      <div id="about" class="section">
        <h1>Activities</h1>
      </div>
      <div id="contact" class="section">
        <h1>Contact</h1>
      </div> */}
    </div>
  );
};

export default Navbar;
