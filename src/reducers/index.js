import {
  FETCH_DATA_FAIL,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  POST_DATA_SUCCESS,
  POST_DATA_FAIL,
  POST_DATA_START
} from "../actions";

export const initialState = {
  sleep: {
    data: [],
    moods: ["😡", "😔", "😐", "😄"]
  },
  user: {},
  err: "",
  isFetching: false,
  isPosting: false
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DATA_START:
      return {
        ...state,
        isPosting: false,
        err: ""
      };
    case POST_DATA_SUCCESS:
      return {
        ...state,
        isPosting: false,
        err: ""
      };
    case POST_DATA_FAIL:
      return {
        ...state,
        isPosting: false,
        err: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        sleep: {
          ...state.sleep,
          data: []
        },
        user: {}
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_DATA_START:
      return {
        ...state,
        isFetching: true,
        err: ""
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sleep: {
          ...state.sleep,
          data: action.payload
        },
        err: ""
      };
    case FETCH_DATA_FAIL:
      return {
        ...state,
        isFetching: false,
        err: action.payload
      };
    default:
      return state;
  }
};
