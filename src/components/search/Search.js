import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../header/Header";
import styles from "./search.module.scss";
import Spinner from "react-spinkit";

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
      rating: "",
      loading: false
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
        <div>
          <div className={styles.details} key={index}>
            <div className={styles.card}>
              <div className={styles.name_space}>
                <h2 className={styles.headerText}>{val.result.result.name}</h2>
              </div>
              <div className={styles.details_space}>
                <h3>{val.result.result.formatted_address}</h3>
                <h3>{val.result.result.formatted_phone_number}</h3>
                {val.result.result.website ? (
                  <a href={val.result.result.website}>
                    {val.result.result.website.substr(7)}
                  </a>
                ) : null}
                <h3> {val.result.result.rating} </h3>
              </div>
              <section>
                {/* className={styles.heart} */}
                <svg
                  className={styles.heart}
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
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
                >
                  <path
                    fill="red"
                    d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
                  />
                </svg>
              </section>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header />
        <div className={styles.bigContainer}>
          <main className={styles.main}>
            <section className={styles.welcomeUser}>
              Talk to somebody in your area {this.props.username}
            </section>
            <br />
            <form className={styles.searchBar}>
              <input
                type="text"
                id={styles.search_bar}
                placeholder="Enter your location"
                onChange={e => this.setState({ userAddress: e.target.value })}
              />
              <img
                className={styles.searchIcon}
                src="https://img.icons8.com/cotton/64/000000/search.png"
                alt=""
                onClick={() => {
                  this.getlocation();
                  this.setState({
                    loading: true
                  });
                }}
              />
            </form>
            <div className={styles.searchResults}>
              {displayData}
              {this.state.loading === true && this.state.data.length === 0 ? (
                <div className={styles.spinner}>
                  <Spinner name="ball-spin-fade-loader" />
                </div>
              ) : null}
            </div>
          </main>
        </div>
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
