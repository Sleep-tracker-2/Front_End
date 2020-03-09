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
import stringifyDate from "../components/StringifyDate";

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
          data: action.payload.map((entry) => {
            let day = new Date(entry.date);
            let startHour = Number(entry.started_sleep.slice(0, 2));
            let endHour = Number(entry.ended_sleep.slice(0, 2));
            let hours = endHour > startHour ? endHour - startHour : endHour + (24 - startHour);
            let startMins = Number(entry.started_sleep.slice(3, 5));
            let endMins = Number(entry.ended_sleep.slice(3, 5));
            let minutes = endMins - startMins;
            let halfHour = Math.round(minutes /= 30) / 2;
            console.log(halfHour);
            let updatedEntry = {
              ...entry,
              day: stringifyDate(day, "M jS"),
              hours: hours + halfHour,
            };
            return updatedEntry;
          })
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
