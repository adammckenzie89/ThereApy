import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import Axios from "axios";
import Header from "../header/Header";

class Search extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props.username) {
    } else {
      this.props.getSession();
    }
  }
  render() {
    console.log(this.props.username);
    return (
      <div>
        <Header />
        <h1>Find your place</h1>
        <div>
          <p>Welcome, {this.props.username}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    username: reduxState.auth.username
  };
};

export default connect(
  mapStateToProps,
  { getSession }
)(Search);
