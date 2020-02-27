import React from "react";
import SleepGraph from "./SleepGraph";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const data = [
    { day: "Feb 23rd", hours: 7.5, mood: 2 },
    { day: "Feb 24th", hours: 6, mood: 1 },
    { day: "Feb 25th", hours: 9, mood: 4 },
    { day: "Feb 26th", hours: 7.5, mood: 3 }
];
export default function SleepGraphContainer(props) {
    const [displayedPlots, setDisplayedPlots] = React.useState({
        showHours: true,
        showMood: true,
    });

    const handleChange = event => {
        setDisplayedPlots({ ...displayedPlots, [event.target.name]: event.target.checked });
    };


    return (
        <div className="sleep-graph-container">
            <SleepGraph data={data} {...displayedPlots}/>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch checked={displayedPlots.showHours} onChange={handleChange} value="showHours" name="showHours" color="primary"/>
                    }
                    label="Show Hours"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={displayedPlots.showMood}
                            onChange={handleChange}
                            value="showMood"
                            name="showMood"
                            color="primary"
                        />
                    }
                    label="Show Mood"
                />

            </FormGroup>
        </div>
    );
}