
import React, { useReducer } from "react";

import SleepGraph from "./SleepGraph";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


import { SleepContext } from "../contexts/SleepContext";

import { reducer, initialState } from "../reducers";

const data = [];
export default function SleepGraphContainer(props) {
	const [state, dispatch] = useReducer(reducer, initialState);


	const [displayedPlots, setDisplayedPlots] = React.useState({
		showHours: true,
		showMood: true
	});

	const handleChange = event => {
		setDisplayedPlots({
			...displayedPlots,
			[event.target.name]: event.target.checked
		});
	};

	return (
		<SleepContext.Provider>
			<div className='sleep-graph-container'>
				<SleepGraph data={state.sleep} {...displayedPlots} />
				<FormGroup row>
					{/*    <FormControlLabel
                    control={
                        <Switch checked={displayedPlots.showHours} onChange={handleChange} value="showHours" name="showHours" color="primary"/>
                    }
                    label="Show Hours"
                />*/}
					<FormControlLabel
						control={
							<Switch
								checked={displayedPlots.showMood}
								onChange={handleChange}
								value='showMood'
								name='showMood'
								color='primary'
							/>
						}
						label={displayedPlots.showMood ? "Showing Mood" : "Showing Hours"}
					/>
				</FormGroup>
			</div>
		</SleepContext.Provider>
	);
}
