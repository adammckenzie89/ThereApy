import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import Header from "../header/Header";
import styles from "./favorites.module.scss";
import axios from "axios";

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.props.getSession();

    axios.get("/api/addFavorites").then(response => {
      console.log(response);
      this.setState({
        data: response.data
      });
    });
  }
  render() {
    console.log(this.state.data);
    return (
      <div>
        <Header />
        <div>
          <p className={styles.welcomeUser}>Welcome, {this.props.username}</p>
        </div>
        {this.state.data.map((val, index) => {
          return (
            <div className={styles.details}>
              <h3>{val.name}</h3>
              <h2 key={index}>{val.address}</h2>
              <img src={val.img} alt="" />
              <h2>{val.number}</h2>
              <h2>{val.rating}</h2>
              <a href={val.website}> {val.website}</a>
            </div>
          );
        })}
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
