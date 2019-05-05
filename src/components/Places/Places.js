import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import Header from "../header/Header";
import styles from "./places.module.scss";

class Places extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getSession();
  }
  render() {
    return (
      <div>
        <Header />
        <img className={styles.photo} />
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
)(Places);
