import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import Header from "../header/Header";
import styles from "./favorites.module.scss";

class Favorites extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getSession();
  }
  render() {
    console.log(this.props.username);
    console.log("hit");
    return (
      <div>
        <Header />
        <div>
          <p className={styles.welcomeUser}>Welcome, {this.props.username}</p>
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
