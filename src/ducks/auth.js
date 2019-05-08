import axios from "axios";

const initialState = {
  username: null, //null (change back)
  error: "",
  userID: ""
};

//action types

const SIGN_UP = "SIGN_UP";
const LOGIN = "LOGIN";
const GET_SESSION = "GET_SESSION";
const LOG_OUT = "LOG_OUT";

//action creators

export function signUp(username, password) {
  return {
    type: SIGN_UP,
    payload: axios.post("auth/signup", { username, password })
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

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case `${SIGN_UP}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username,
        id: action.payload.data.id
      };
    case `${LOGIN}_FULFILLED`:
      console.log(action.payload);
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
    default:
      return state;
  }
}
