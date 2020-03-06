

import React, { useContext, useState } from "react";

import {connect} from "react-redux"
import ReactDOM from "react-dom";
//import { SleepContext } from "../contextsA/SleepContext";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import SleepDetail from "./SleepDetail";
import stringifyDate from "./StringifyDate";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function SleepGraph({ sleep, showHours, showMood }) {
   console.log("SLEEPGRAPH", sleep);
   sleep.data = sleep.data.map((entry)=>{
       let day = new Date(entry.date);
       //fixing a bug that makes it show yesterday's date instead
       day = new Date(day.getTime() + 1000*3600*24);
       let startHour = Number(entry.started_sleep.slice(0,2));
       let endHour = Number(entry.ended_sleep.slice(0,2));
       let hours = endHour > startHour ? endHour-startHour : endHour + (24-startHour);
       let startMins = Number(entry.started_sleep.slice(3, 5));
       let endMins = Number(entry.ended_sleep.slice(3, 5));
       let minutes = endMins - startMins;
       let halfHour = Math.round(minutes /=30)/2;
        console.log(halfHour);
        let updatedEntry = {
            ...entry,
            day: stringifyDate(day, "M jS"),
            hours: hours+halfHour,
        };
        return updatedEntry;
   });
    const [selectedData, setSelectedData] = React.useState({});
    const classes=useStyles();
    function handleToggleModal(data){
        setSelectedData(data);
        setDateModal(!dateModal);
    }
    const [dateModal, setDateModal]= React.useState(false);
    //Calc Sleep
    const graphHeight = sleep.data.reduce((ac, val) => Math.max(ac, val.hours), 0);
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
        <>
            <VictoryChart
                style={{

                }}
                domainPadding={20}>
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "#ffffff",
                        },
                        axisLabel: {
                            fill: "#ffffff",
                        },
                        ticks: {
                            fill: "#ffffff",
                        },
                        tickLabels: {
                            fill: "#ffffff",
                        },
                    }}
                    tickValues={sleep.data.map((datum, idx) => idx + 1)}
                    tickFormat={sleep.data.map(datum => datum.day)}
                    label="Date"
                />
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "#ffffff",
                        },
                        axisLabel: {
                            fill: "#ffffff",
                        },
                        ticks: {
                            fill: "#ffffff",
                        },
                        tickLabels: {
                            fill: "#ffffff",
                        },
                    }}
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
                {showHours && <VictoryLine
                    style={{
                        data: {
                            stroke: "#ffffff",
                        },
                        labels: {
                            fill: "#ffffff",
                        },
                    }}
                    data={sleep.data}
                    //labels={showMood ? [] : ({ datum }) => `${datum.hours} hrs ${/*hasComment ? "" : */"💬"}`}
                    x="day"
                    y="hours"
                />}
                {<VictoryBar
                    events={[{
                        target: "labels",
                        eventHandlers: {
                            onClick: () => {return [{ target: "data", mutation: (props) =>handleToggleModal({...props.datum, mood: props.datum.mood*4/graphHeight}) }];}
                        }
                    }]}
                    data={sleep.data.map((entry) => {
                        return { ...entry, mood: entry.mood * graphHeight / 4 };
                    })}
                    labels={sleep.data.map(({ mood, comment, hours }) => showMood ? sleep.moods[mood - 1] + `${comment ? "💬" : ""}` : `${hours} ${comment ? "💬" : ""}`)}
                    style={{
                        data: {
                            fill: "#ffffff00",//({datum})=> moodToColor(datum.mood, "dd"),
                            stroke: "#ffffff00",//({datum}) => moodToColor(datum.mood, "ff"),
                            strokeWidth: 1
                        },
                        labels: {
                            fill: "#ffffff",
                        },
                    }}
                    x="day"
                    y="hours"
                />}
            </VictoryChart>

            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={dateModal}
                onClose={handleToggleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={dateModal}>
                    <Paper elevation={3}>
                        <SleepDetail {...selectedData} moods={sleep.moods}/>
                    </Paper>
                </Fade>
            </Modal>
        </>
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