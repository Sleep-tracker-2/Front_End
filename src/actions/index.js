import axios from "axios";

import { axiosWithAuth } from "../utils/axiosWithAuth";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";

export const POST_DATA_START = "POST_DATA_START  ";
export const POST_DATA_SUCCESS = "POST_DATA_SUCCESS";
export const POST_DATA_FAIL = "POST_DATA_FAIL   ";

const user = JSON.parse(localStorage.getItem("user"));

const userID = user?.id;

console.log("USER", user?.id);

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export const postSleepData = data => dispatch => {
  console.log("ACTIONS", data);
  
  dispatch({ type: POST_DATA_START });
  axiosWithAuth()
    .post(`users/${userID}/sleep`, data)
    .then(res => {
      dispatch({ type: POST_DATA_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: POST_DATA_FAIL, payload: err});
    });
};

export const getSleepData = () => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axiosWithAuth()
    .get(`users/${userID}/sleep`)
    .then(res => {
      console.log("DATA:", res);

      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FETCH_DATA_FAIL, payload: err }));
};
