
import React, { useEffect } from "react";

import SleepGraph from "./SleepGraph";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import {getSleepData} from '../actions'


import {connect} from 'react-redux'



function SleepGraphContainer(props) {


	
	useEffect(() => {props.getSleepData()}, [])
	

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
		
			<div className='sleep-graph-container'>
			
			
				<SleepGraph {...displayedPlots} />
				<FormGroup row>
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
		
        
	);
}

const mapStateToProps = state => {
	return {
	  sleep: state.sleep
	};
  };
  
  export default connect(
	mapStateToProps,
	{getSleepData}
  )(SleepGraphContainer);