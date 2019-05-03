import React, { Component } from "react";
import { getSession } from "../../ducks/auth";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../header/Header";
import styles from "./search.module.scss";

const { KEY } = process.env;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      lat: "",
      lng: "",
      switch: false
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
        }&key=AIzaSyBdyzNFMobsjNsfCLy2XIno2dLW0GP3BDs`
      )
      .then(response => {
        console.log(response);
        this.setState(
          {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng
          },
          () => {
            let location = { lat: this.state.lat, lng: this.state.lng };
            axios.post("/api/location", location).then(response => {
              console.log(response);
              this.setState({
                data: response.data
              });
            });
          }
        );
      });
  };
  render() {
    const { data } = this.state;
    console.log(data);
    let displayData = this.state.data.map((val, index) => {
      return (
        <div className={styles.details}>
          <div className={styles.image}>
            {val.photos ? (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBdyzNFMobsjNsfCLy2XIno2dLW0GP3BDs&maxwidth=400&photoreference=${
                  val.photos
                }`}
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
              <img src="https://img.icons8.com/material-outlined/24/000000/filled-like.png" />
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
        {/* <h4>{data.geometry.name}</h4> */}
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
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
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
    username: reduxState.auth.username
  };
};

export default connect(
  mapStateToProps,
  { getSession }
)(Search);
