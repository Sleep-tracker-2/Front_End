import {FETCH_DATA_FAIL, FETCH_DATA_START, FETCH_DATA_SUCCESS, LOGIN_USER, LOGOUT_USER} from '../actions'

export const initialState = {
	sleep: {
		data: [
			{
				"sleep_id": 2,
				"user_id": 2,

				"started_sleep": "07:11:00",

				"ended_sleep": "10:25:00",
				"date": "2020-03-02T02:43:55.960Z",
				"mood": 1,
				"username": "test_user_two",

				"comment": ""
			},
			{
				"sleep_id": 4,
				"user_id": 2,
				"started_sleep": "20:54:00",
				"ended_sleep": "11:30:00",
				"date": "2020-03-03T02:44:15.043Z",
				"mood": 2,
				"username": "test_user_two",
				"comment": "my sleep was bad!"
			},
			{

				"sleep_id": 7,
				"user_id": 2,
				"started_sleep": "05:54:00",
				"ended_sleep": "11:30:00",

				"date": "2020-03-04T02:45:24.991Z",
				"mood": 1,
				"username": "test_user_two",
				"comment": "my sleep was okay"
			}

		],
		moods: ["😡", "😔", "😐", "😄"]
	},
	user: {
		id: 0,
		account_created: "1/1/2000",
		username: "JohnDoe2020",
		average_sleep: null,
		token: null
	},
	err: "",
	isFetching: false
};
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_ENTRY":
			return {
				...state,
				sleep: {...state.sleep,
				data: [
					...state.sleep.data,
					...action.payload
				]
				}
		
			};
		case LOGOUT_USER:
			return {
				...state,
				sleep: {
					...state.sleep,
					data: []
				},
				user: {}
			}
		case LOGIN_USER:
			return {
				...state,
				user: action.payload
				
			}
		case FETCH_DATA_START:
			return {
				...state,
				isFetching: true
			}
		case FETCH_DATA_SUCCESS:
			return {
				...state,
				isFetching: false,
				sleep: {
					...state.sleep,
					data: action.payload
				}
			}
		case FETCH_DATA_FAIL:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state;
	}
};
