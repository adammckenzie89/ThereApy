import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../../ducks/auth";
import { Link } from "react-router-dom";
import Styles from "./Signup.module.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
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

    this.props.signUp(this.state.username, this.state.password);
  }

  render() {
    if (this.props.username) {
      return <Redirect to="/search" push={true} />;
    }
    return (
      <div>
        <h1>Signup</h1>
        <form className={Styles.form} onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
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
          <button>Submit</button>
          <p>{this.props.error}</p>
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
