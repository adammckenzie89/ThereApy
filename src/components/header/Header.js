import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./header.module.scss";
import { connect } from "react-redux";
import { logOut } from "../../ducks/auth";
import styles from "./header.module.scss";
import logo from "./logo.png";
import geolocation from "./geolocation.png";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      menu: false
    };
  }
  handleClick = () => {
    this.setState({
      menu: !this.state.menu
    });
  };
  render() {
    if (!this.props.auth.username) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div className={styles.outer}>
        <nav>
          <div className={styles.logoContainer}>
            <img className={styles.headerLogo} src={logo} alt="logo" />
          </div>
          <div className={styles.burgerContainer}>
            <img
              onClick={this.handleClick}
              className={styles.hamburger}
              src="https://cdn0.iconfinder.com/data/icons/essentials-line/100/Menu-512.png"
            />
          </div>
          <div className={styles.linksCon}>
            <Link to="search">
              <h3 className={styles.links}>Search</h3>
            </Link>
            <Link to="/favorites">
              <h3 className={styles.links}>Favorites</h3>
            </Link>
            <Link to="/profile">
              <h3 className={styles.links}>Profile</h3>
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
        <div className={this.state.menu ? styles.menuOpen : styles.menuClosed}>
          <Link to="/profile">
            <h3 className={styles.links}>Profile</h3>
          </Link>
          <Link to="/favorites">
            <h3 className={styles.links}>Favorites</h3>
          </Link>
          <Link to="search">
            <h3 className={styles.links}>Search</h3>
          </Link>
          <div />
        </div>
        <section className={styles.headerextension}>
          <div className={styles.one}>
            <img
              className={styles.feelBetter}
              src="https://img.icons8.com/ios/100/000000/dancing-party-filled.png"
            />
            <p className={styles.boxParagraphs}>
              It's time for you to start feeling better. You owe it to yourself.
            </p>
          </div>
          <div className={styles.two}>
            <img className={styles.geolocation} src={geolocation} />
            <p className={styles.boxParagraphs}>
              We use built in geolocation to find a therapist closest to you
            </p>
          </div>
          <div className={styles.three}>
            <img
              className={styles.comment}
              src="https://img.icons8.com/ios/100/000000/feedback-filled.png"
            />
            <p className={styles.boxParagraphs}>
              Share your experience with others
            </p>
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
