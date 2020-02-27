import React from "react";
import ReactDOM from "react-dom";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';

const data = [
    { day: "Feb 23rd", hours: 7.5, mood: 2 },
    { day: "Feb 24th", hours: 6, mood: 1 },
    { day: "Feb 25th", hours: 9, mood: 4 },
    { day: "Feb 26th", hours: 7.5, mood: 3 }
];
const graphHeight = 10;//data.reduce((ac, val) => Math.max(ac, val.hours), 0);
const moods = ["😡", "😔", "😐", "😄"];
function moodToColor(mood, opacity){
    switch(mood){
        case(graphHeight): return "#00ff00"+opacity;
        case(graphHeight*3/4): return "#ffff00"+opacity;
        case(graphHeight/2): return "#ffaa00"+opacity;
        case(graphHeight/4): return "#ff0000"+opacity;
        default: return "#000000ff";
    }
}

export default function SleepGraph(props) {
    return (
        <VictoryChart domainPadding={20}>
            <VictoryAxis
                tickValues={data.map((datum, idx) => idx + 1)}
                tickFormat={data.map(datum => datum.day)}
                label="Date"
            />
            <VictoryAxis
                dependentAxis
                domain={[0, graphHeight]}
                label="Sleep (hrs)"
            />
            {/*<VictoryAxis
                dependentAxis
                tickValues={[
                    graphHeight / 4,
                    graphHeight / 2,
                    graphHeight * 3 / 4,
                    graphHeight
                ]}
                tickFormat={moods}
                orientation="right"
                label="Mood"
            />*/}
            <VictoryBar
                data={data.map(({day, mood}) => { 
                    return { day: day, mood: mood * graphHeight / 4 }; 
                })}
                labels={data.map(({mood})=>moods[mood-1])}
                style={{
                    data: {
                        fill: ({datum})=> moodToColor(datum.mood, "dd"),
                        stroke: ({datum}) => moodToColor(datum.mood, "ff"),
                        strokeWidth: 1
                    }
                }}
                x="day"
                y="mood"
            />
            <VictoryLine
                data={data}
                x="day"
                y="hours"
            />
        </VictoryChart>
    );
}