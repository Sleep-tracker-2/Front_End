

import React, { useContext, useState } from "react";

import { connect } from "react-redux"
import ReactDOM from "react-dom";
//import { SleepContext } from "../contextsA/SleepContext";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SleepDetail from "./SleepDetail";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";

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
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function SleepGraph({ sleep, showHours, showMood }) {
    console.log("SLEEPGRAPH", sleep);
    const [displayedData, setDisplayedData] = React.useState(sleep.data);
    const [selectedData, setSelectedData] = React.useState({});
    const [month, setMonth] = React.useState(new Date().getMonth());
    const [year, setYear] = React.useState(2020);
    const classes = useStyles();
    function handleToggleModal(data) {
        setSelectedData(data);
        setDateModal(!dateModal);
    }

    React.useEffect(() => {
        setDisplayedData(sleep.data.filter((entry) => {
            const date = new Date(entry.date);
            return (new Date(date)).getMonth() === month && (new Date(date)).getFullYear() === year;
        }));

    }, [sleep, month, year]);

    const [dateModal, setDateModal] = React.useState(false);
    //Calc Sleep
    const graphHeight = displayedData[0]
        ? displayedData.reduce((ac, val) => Math.max(ac, val.hours), 0)
        : 10;
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
            <Container style={{zIndex:"10"}}
            ><Grid container direction="row" style={{ justifyContent: "space-around" }}>
                    <Button variant="outlined"
                        onClick={() => {
                            if (month == 0) {
                                setMonth(11);
                                setYear(year - 1);
                            }
                            else
                                setMonth(month - 1);
                        }}
                    ><ArrowBack /></Button>
                    <Typography variant="h4">{months[month] + " " + year}</Typography>
                    <Button variant="outlined"
                        disabled={(new Date()).getMonth() === month && (new Date()).getFullYear() === year}
                        onClick={() => {
                            if (month == 11) {
                                setMonth(0);
                                setYear(year + 1);
                            }
                            else
                                setMonth(month + 1);
                        }}
                    ><ArrowForward /></Button>
                </Grid>
            </Container>
            <VictoryChart
                style={{
                    zIndex: "0",
                    transform: "translateY(-50px)"
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
                    tickValues={displayedData.map((datum, idx) => idx + 1)}
                    tickFormat={displayedData.map(datum => datum.day)}
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
                    data={displayedData}
                    //labels={showMood ? [] : ({ datum }) => `${datum.hours} hrs ${/*hasComment ? "" : */"💬"}`}
                    x="day"
                    y="hours"
                />}
                {<VictoryBar
                    events={[{
                        target: "labels",
                        eventHandlers: {
                            onClick: () => { return [{ target: "data", mutation: (props) => handleToggleModal({ ...props.datum, mood: props.datum.mood * 4 / graphHeight }) }]; }
                        }
                    }]}
                    data={displayedData.map((entry) => {
                        return { ...entry, mood: entry.mood * graphHeight / 4 };
                    })}
                    labels={displayedData.map(({ mood, comment, hours }) => showMood ? sleep.moods[mood - 1] + `${comment ? "💬" : ""}` : `${hours} ${comment ? "💬" : ""}`)}
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
                        <SleepDetail {...selectedData} moods={sleep.moods} />
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