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
            <div className={styles.details} key={index}>
              <div className={styles.image}>
                {val.img ? (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBdyzNFMobsjNsfCLy2XIno2dLW0GP3BDs&maxwidth=400&photoreference=${
                      val.img
                    } `}
                  />
                ) : (
                  <div className={styles.default_image} />
                )}
              </div>
              <div className={styles.text}>
                <h2>{val.name}</h2>
                {this.state.switch === index ? (
                  <div>
                    <h3>{val.address}</h3>
                    <h3>{val.number}</h3>
                    {val.website ? (
                      <a href={val.website}>{val.website.substr(7)}</a>
                    ) : null}
                    {val.rating > 2 ? <h3> {val.rating} </h3> : null}
                  </div>
                ) : null}
                <section>
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

// return (
//   <div className={styles.details} key={index}>
//     <h3>{val.name}</h3>
//     <h2>{val.address}</h2>
//     <img
//       src={`https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBdyzNFMobsjNsfCLy2XIno2dLW0GP3BDs&maxwidth=400&photoreference=${
//         val.img
//       } `}
//     />
//     <h2>{val.number}</h2>
//     <h2>{val.rating}</h2>
//     <a href={val.website}> {val.website}</a>
//   </div>
// );
