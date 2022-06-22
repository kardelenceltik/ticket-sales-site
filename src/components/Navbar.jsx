import React from "react";

const Navbar = () => {
  return (
    <div>
      <div class="navbar">
        <div class="logo">
          <h1>Ticket</h1>
        </div>
        <div className="input-area">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>
        <div class="nav__links">
          <a href="#home" class="active nav__link">
            Home
          </a>

          <a href="#about" class="nav__link">
            Activities
          </a>
          <a href="#contact" class="nav__link">
            Contact
          </a>
        </div>
      </div>

      <div id="home" class="section">
        <h1>Home</h1>
      </div>
      <div id="about" class="section">
        <h1>Activities</h1>
      </div>
      <div id="contact" class="section">
        <h1>Contact</h1>
      </div>
    </div>
  );
};

export default Navbar;
