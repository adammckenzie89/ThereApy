import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../header/Header";
import styles from "./search.module.scss";

const { REACT_APP_KEY } = process.env;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      lat: "",
      lng: "",
      switch: false,
      name: "",
      formatted_address: "",
      formatted_phone_number: "",
      website: "",
      rating: ""
    };
  }
  componentDidMount() {
    this.props.getSession();
  }
  getlocation = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          this.state.userAddress
        }&key=${REACT_APP_KEY}`
      )
      .then(response => {
        this.setState(
          {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng
          },
          () => {
            let location = { lat: this.state.lat, lng: this.state.lng };
            axios.post("/api/location", location).then(response => {
              this.setState({
                data: response.data
              });
            });
          }
        );
      });
  };

  render() {
    let displayData = this.state.data.map((val, index) => {
      return (
        <div className={styles.details} key={index}>
          <div className={styles.image}>
            {val.photos ? (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?key=${REACT_APP_KEY}&maxwidth=400&photoreference=${
                  val.photos
                }`}
                alt=""
              />
            ) : (
              <div className={styles.default_image} />
            )}
          </div>
          <div className={styles.text}>
            <h2>{val.result.result.name}</h2>
            {this.state.switch === index ? (
              <div>
                <h3>{val.result.result.formatted_address}</h3>
                <h3>{val.result.result.formatted_phone_number}</h3>
                {val.result.result.website ? (
                  <a href={val.result.result.website}>
                    {val.result.result.website.substr(7)}
                  </a>
                ) : null}
                {val.result.result.rating > 2 ? (
                  <h3> {val.result.result.rating} </h3>
                ) : null}
              </div>
            ) : null}
            <section>
              <img
                className={styles.searchIcon}
                src="https://img.icons8.com/material-outlined/24/000000/filled-like.png"
                alt="" //heart
                onClick={() => {
                  axios
                    .post("/api/addFavorite", {
                      name: val.result.result.name,
                      formatted_address: val.result.result.formatted_address,
                      formatted_phone_number:
                        val.result.result.formatted_phone_number,
                      website: val.result.result.website,
                      rating: val.result.result.rating,
                      img: val.photos,
                      id: this.props.id
                    })
                    .then(response => {
                      this.setState({
                        response: response.data
                      });
                    });
                }}
              />
              {this.state.switch === index ? (
                <button onClick={e => this.setState({ switch: null })}>
                  close
                </button>
              ) : (
                <button onClick={e => this.setState({ switch: index })}>
                  Details
                </button>
              )}
            </section>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header />
        <main className={styles.main}>
          <section className={styles.welcomeUser}>
            Welcome, {this.props.username}
          </section>
          <br />
          <form className={styles.searchBar}>
            <input
              type="text"
              id={styles.search_bar}
              placeholder="Find a place near you"
              onChange={e => this.setState({ userAddress: e.target.value })}
            />
            <img
              className={styles.searchIcon}
              src="https://img.icons8.com/cotton/64/000000/search.png"
              alt=""
              onClick={this.getlocation}
            />
          </form>
          {displayData}
        </main>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    username: reduxState.auth.username,
    id: reduxState.auth.id
  };
};

export default connect(
  mapStateToProps,
  { getSession }
)(Search);
