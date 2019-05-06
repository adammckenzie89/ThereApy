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
      data: [],
      posts: [],
      input: "",
      content: ""
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
    axios.get("/api/joinPosts").then(response => {
      this.setState({
        content: response.data
      });
    });
  }
  // removePost = id => {
  //   axios.delete(`/api/removePost/:${id}`);
  // };
  render() {
    return (
      <div>
        <Header />
        <div>
          <p className={styles.welcomeUser}>Welcome, {this.props.username}</p>
        </div>
        {this.state.data.map((val, index) => {
          return (
            <div className={styles.details} key={val.favoritesid}>
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
                  <br />
                  {this.state.switch === index ? (
                    <button onClick={e => this.setState({ switch: null })}>
                      close
                    </button>
                  ) : (
                    <button onClick={e => this.setState({ switch: index })}>
                      Details
                    </button>
                  )}
                  <br />
                </section>
                <div>
                  <form
                    onSubmit={() => {
                      axios
                        .post("/api/makePosts", {
                          content: this.state.input,
                          favoritesid: val.favoritesID
                        })
                        .then(response => {
                          this.setState({ content: response.data, input: "" });
                        })
                        .then(() =>
                          axios.get("/api/joinPosts").then(response => {
                            this.setState({
                              content: response.data
                            });
                          })
                        );
                    }}
                  >
                    <input
                      className={styles.inputStuff}
                      placeholder="Add comment"
                      onChange={e => this.setState({ input: e.target.value })}
                    />
                  </form>
                  <div>
                    {!this.state.content
                      ? null
                      : this.state.content.map((item, index) => {
                          if (item.favoritesID === val.favoritesID) {
                            return (
                              <div className={styles.comments}>
                                <p>{item.content}</p>
                                <button
                                  onClick={e =>
                                    axios
                                      .delete(`/api/removePost/${item.postid}`)
                                      .then(() =>
                                        axios
                                          .get("/api/joinPosts")
                                          .then(response => {
                                            this.setState({
                                              content: response.data
                                            });
                                          })
                                      )
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            );
                          }
                        })}
                  </div>
                </div>
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
