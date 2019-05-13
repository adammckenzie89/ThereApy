import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./header.module.scss";
import { connect } from "react-redux";
import { logOut } from "../../ducks/auth";
import styles from "./header.module.scss";
import logo from "./logo.png";

class Header extends Component {
  render() {
    if (!this.props.auth.username) {
      return <Redirect to="/" push={true} />;
    }
    console.log(this.props);
    return (
      <div className={styles.outer}>
        <nav>
          <div className={styles.logoContainer}>
            <img className={styles.headerLogo} src={logo} alt="logo" />
          </div>
          <div className={styles.linksCon}>
            <Link to="/profile">
              <h3 className={styles.links}>Profile</h3>
            </Link>
            <Link to="/favorites">
              <h3 className={styles.links}>Favorites</h3>
            </Link>
            <Link to="search">
              <h3 className={styles.links}>Search</h3>
            </Link>
          </div>
          <div>
            <h3
              className={styles.logout}
              onClick={() => {
                this.props.logOut();
                window.location.reload();
              }}
            >
              Log out
            </h3>
          </div>
        </nav>
        <section className={styles.headerextension}>
          <div className={styles.one}>
            <img
              className={styles.feelBetter}
              src="https://img.icons8.com/ios/100/000000/dancing-party-filled.png"
            />
            <p>
              It's time for you to start feeling better. you owe it to yourself!
            </p>
          </div>
          <div className={styles.two}>
            <img
              className={styles.geolocation}
              src="http://chittagongit.com/images/geo-location-icon/geo-location-icon-3.jpg"
            />
            <p>
              We use built in geolocation to find a therapist closest to you
            </p>
          </div>
          <div className={styles.three}>
            <img
              className={styles.comment}
              src="https://img.icons8.com/ios/100/000000/feedback-filled.png"
            />
            <p>Share you experience with other users</p>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
