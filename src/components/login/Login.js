import React, { Component } from "react";
import { Link } from "react-router-dom";
import Signup from "./loginComponents/Signup";
import Loginform from "./loginComponents/Loginform";
import styles from "./login.module.scss";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      signup: "not showing",
      login: "showing",
      shown: "signup"
    };
  }
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.welcome}>
          <h2>Hello! Lets get you started</h2>
          <br />
          <h4
            onClick={e => {
              if (this.state.shown === "signup") {
                this.setState({
                  login: "not showing",
                  signup: "showing",
                  shown: "login"
                });
              } else if (this.state.shown === "login") {
                this.setState({
                  login: "showing",
                  signup: "not showing",
                  shown: "signup"
                });
              }
            }}
          >
            {this.state.shown === "signup"
              ? "Signup"
              : this.state.shown === "login"
              ? "Login"
              : null}{" "}
            here
          </h4>
        </div>
        <div className={styles.login}>
          <h1>Therapy Logo</h1>
          {this.state.login === "showing" ? <Loginform /> : null}
          {this.state.signup === "showing" ? <Signup /> : null}
        </div>
      </div>
    );
  }
}
export default Login;
