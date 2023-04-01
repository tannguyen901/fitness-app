import React from "react";
import { NavLink } from "react-router-dom";
import dumbbellLogo from "../assets/dumbbell-logo.png"; // Update this path to match the location of your logo file

const Header = () => {
  return (
    <header>
      <img src={dumbbellLogo} alt="Dumbbell Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/food-tracker" activeClassName="active">
              Food Tracker
            </NavLink>
          </li>
          <li>
            <NavLink to="/exercise-tracker" activeClassName="active">
              Exercise Tracker
            </NavLink>
          </li>
          <li>
            <NavLink to="/running-tracker" activeClassName="active">
              Running Tracker
            </NavLink>
          </li>
          <li>
            <NavLink to="/bmi-calculator" activeClassName="active">
              BMI Calculator
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
