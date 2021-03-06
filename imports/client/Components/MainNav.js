import React, { Component } from "react";
import { Link } from "react-router-dom";

/* 
This is the navagation bar that takes you between application routes. 
These routes include programs, and information. Usually included on all pages.
*/

class MainNav extends Component {
  toggleNav() {
    document.getElementById("myNav").style.height = "100%";
  }

  render() {
    return (
      <div className="MainNav">
        <Link to="/">
          <h1 className="MainNav__logo">Strength & Body Works</h1>
        </Link>
        <div className="MainNav__burger-icon" onClick={() => this.toggleNav()}>
          <div />
          <div />
          <div />
        </div>
        <div className="MainNav__main-items">
          <Link to="/programs/powerbb">
            <p className="MainNav__main-items__item">Power BB</p>
          </Link>
          <Link to="/programs/531">
            <p className="MainNav__main-items__item">5/3/1 Simplest Template</p>
          </Link>
          <Link to="/about">
            <p className="MainNav__main-items__item MainNav__main-items__item-last">
              Help
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainNav;
