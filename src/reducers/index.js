export const initialState = {
	sleep: {
		data: [
			{ day: "Feb 23rd", hours: 7.5, mood: 2 },
			{ day: "Feb 24th", hours: 6, mood: 1 },
			{ day: "Feb 25th", hours: 9, mood: 4 },
			{ day: "Feb 26th", hours: 7.5, mood: 3 },
			{ day: "Feb 27th", hours: 7.5, mood: 2 },
			{ day: "Feb 28th", hours: 6, mood: 1 }
		],
		moods: ["😡", "😔", "😐", "😄"]
	},
	
	user: {
		id: 0,
		account_created: "1/1/2000",
		username: "JohnDoe2020",
		average_sleep: null,
		token: null
	}
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
		case "LOGIN_USER" :
			return {
				...state,
				user: action.payload
				
			}
		default:
			return state;
	}
};
