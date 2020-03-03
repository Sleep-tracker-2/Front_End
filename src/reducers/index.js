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
		dateCreated: "1/1/2000",
		username: "JohnDoe2020",
		token: null
	}
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_ENTRY":
			return {
				...initialState,
				sleep: {...initialState.sleep,
				data: [
					...initialState.sleep.data,
					...action.payload
				]
				}
			};
		default:
			return state;
	}
};
