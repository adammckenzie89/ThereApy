import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../../ducks/auth";
import Styles from "./Signup.module.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.signUp(
      this.state.username,
      this.state.password,
      this.state.email
    );
  }

  render() {
    if (this.props.username) {
      return <Redirect to="/search" push={true} />;
    }
    return (
      <div>
        <h1 className={Styles.signupFont}>Signup</h1>
        <form className={Styles.form} onSubmit={this.handleSubmit}>
          <div styles={Styles.usernamediv}>
            <img
              className={Styles.profileimage}
              src="https://img.icons8.com/metro/26/000000/gender-neutral-user.png"
            />
            <input
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
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
          <div className={Styles.emaildiv}>
            <img
              className={Styles.emailicon}
              src="https://img.icons8.com/ios/50/000000/secured-letter-filled.png"
            />
            <input
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
            />
            <p>{this.props.error}</p>
          </div>
          <button className={Styles.signupButton}> Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    username: reduxState.auth.username,
    error: reduxState.auth.error
  };
};

export default connect(
  mapStateToProps,
  { signUp }
)(Signup);
