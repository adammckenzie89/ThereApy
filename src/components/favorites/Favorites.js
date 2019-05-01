import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import Header from "../header/Header";

class Favorites extends Component {
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
    console.log("hit");
    return (
      <div>
        <Header />
        <h1>Favorite places</h1>
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
)(Favorites);
