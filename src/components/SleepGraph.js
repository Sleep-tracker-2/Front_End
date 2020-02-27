import React from "react";
import ReactDOM from "react-dom";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';

const data = [
    { day: "Feb 23rd", hours: 7.5, mood: 2 },
    { day: "Feb 24th", hours: 6, mood: 1 },
    { day: "Feb 25th", hours: 9, mood: 4 },
    { day: "Feb 26th", hours: 7.5, mood: 3 }
];
const graphHeight = data.reduce((ac, val) => Math.max(ac, val.hours), 0);
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
            <VictoryAxis
                dependentAxis
                tickValues={[
                    graphHeight / 4,
                    graphHeight / 2,
                    graphHeight * 3 / 4,
                    graphHeight
                ]}
                tickFormat={["😡", "😴", "😐", "😄"]}
                orientation="right"
                label="Mood"
            />
            <VictoryBar
                data={data.map(datum => { return { day: datum.day, mood: datum.mood * graphHeight / 4 }; })}
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