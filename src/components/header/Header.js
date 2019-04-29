import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.module.scss";

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <nav>
          <Link to="/places">
            <h3>places</h3>
          </Link>
          <Link to="/favorites">
            <h3>favorites</h3>
          </Link>
          <Link to="search">
            <h3>search</h3>
          </Link>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </nav>
      </div>
    );
  }
}
export default Header;
