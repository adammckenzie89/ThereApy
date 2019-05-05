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

    this.props
      .login(this.state.username, this.state.password)
      .catch(err => console.log(err));
    this.setState({ username: "", password: "", check: true });
    console.log(this.state.username);
    // console.log(this.props.auth.username);
  }

  render() {
    if (this.props.auth.username) {
      console.log(this.props.username);
      return <Redirect to="/search" push={true} />;
    }
    return (
      <div>
        <h1>Login</h1>
        <form className={Styles.form} onSubmit={this.handleSubmit}>
          <input
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
            autoComplete="off"
          />
          <br />
          <input
            placeholder="password"
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
          />
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
