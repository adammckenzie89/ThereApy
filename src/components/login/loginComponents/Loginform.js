import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../ducks/auth";
import Styles from "./Signup.module.scss";

class Loginform extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.login(this.state.username, this.state.password);
    this.setState({ username: "", password: "", check: true });
  }

  render() {
    if (this.props.auth.username) {
      return <Redirect to="/search" push={true} />;
    }
    return (
      <div>
        <h1 className={Styles.loginText}> Login</h1>
        <form className={Styles.form} onSubmit={this.handleSubmit}>
          <div className={Styles.usernamediv}>
            <img
              className={Styles.profileimage}
              src="https://img.icons8.com/metro/26/000000/gender-neutral-user.png"
            />
            <input
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
              autoComplete="off"
            />
          </div>
          <br />
          <div className={Styles.passworddiv}>
            <img
              className={Styles.passwordicon}
              src="https://img.icons8.com/metro/26/000000/lock-2.png"
            />
            <input
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              type="password"
            />
          </div>
          <br />
          <button>login</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { login }
)(Loginform);
