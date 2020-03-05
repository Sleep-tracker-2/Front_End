
import React, { useContext, useState } from "react";

import {connect} from "react-redux"
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';
const moods = []


function SleepGraph({showHours, showMood, sleep}) {
    
   console.log("SLEEPGRAPH", sleep);
   
    
    const graphHeight = 10;//data.reduce((ac, val) => Math.max(ac, val.hours), 0);
    //const {moods} = React.useContext(SleepContext);
    function moodToColor(mood, opacity) {
        switch (mood) {
            case (graphHeight): return "#00ff00" + opacity;
            case (graphHeight * 3 / 4): return "#ffff00" + opacity;
            case (graphHeight / 2): return "#ffaa00" + opacity;
            case (graphHeight / 4): return "#ff0000" + opacity;
            default: return "#000000ff";
        }
    }
    return (
        <VictoryChart domainPadding={20}>
            <VictoryAxis
                tickValues={sleep.data.map((datum, idx) => idx + 1)}
                tickFormat={sleep.data.map(datum => datum.day)}
                label="Date"
            />
            <VictoryAxis
                dependentAxis
                domain={[0, graphHeight]}
                label="Sleep (hrs)"
            />
            {showMood && <VictoryBar
                data={sleep.data.map(({day, mood, hours}) => { 
                    return { day: day, hours: hours, mood: mood * graphHeight / 4 }; 
                })}
                labels={sleep.data.map(({mood})=>sleep.moods[mood-1])}
                style={{
                    data: {
                        fill: ({datum})=> moodToColor(datum.mood, "dd"),
                        stroke: ({datum}) => moodToColor(datum.mood, "ff"),
                        strokeWidth: 1
                    }
                }}
                x="day"
                y="hours"
            />}
            {showHours &&<VictoryLine
                data={sleep.data}
                labels={showMood ? []: ({datum})=> `${datum.hours} hrs`}
                x="day"
                y="hours"
            />}
        </VictoryChart>
    );
}

const mapStateToProps = state => {
	return {
	  sleep: state.sleep
	};
  };
  
  export default connect(
	mapStateToProps,
  )(SleepGraph);