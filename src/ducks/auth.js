import axios from "axios";

const initialState = {
  username: null,
  error: "",
  userID: ""
};

//action types

const SIGN_UP = "SIGN_UP";
const LOGIN = "LOGIN";
const GET_SESSION = "GET_SESSION";
const LOG_OUT = "LOG_OUT";
const EDIT_PROFILE = "EDIT_PROFILE";

//action creators

export function signUp(username, password, email) {
  return {
    type: SIGN_UP,
    payload: axios.post("auth/signup", { username, password, email })
  };
}
export function login(username, password) {
  return {
    type: LOGIN,
    payload: axios.post("/auth/login", { username, password })
  };
}
export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios.get("/auth/cookie")
  };
}
export function logOut() {
  return {
    type: LOG_OUT,
    payload: axios.get("/auth/logout")
  };
}
export function editProfile(session, username, email) {
  return {
    type: EDIT_PROFILE,
    payload: axios.put("/auth/editProfile", {
      session,
      username,
      email
    })
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SIGN_UP}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data[0].username,
        id: action.payload.data[0].id
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username,
        userID: action.payload.data.id
      };
    case `${SIGN_UP}_REJECTED`:
      return {
        ...state,
        error: "Username already exists"
      };
    case `${GET_SESSION}_FULFILLED`:
      if (action.payload.data.username === "") {
        return {
          ...state,
          username: ""
        };
      } else {
        return {
          ...state,
          username: action.payload.data.username,
          userID: action.payload.data.id
        };
      }
    case `${LOG_OUT}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username
      };
    case `${EDIT_PROFILE}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username
      };
    default:
      return state;
  }
}
