
import React from "react";
import ReactDOM from "react-dom";
import { SleepContext } from "../contexts/SleepContext";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import SleepDetail from "./SleepDetail";
const moods = ["😡", "😔", "😐", "😄"]

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

export default function SleepGraph({ data, showHours, showMood }) {
    const [selectedData, setSelectedData] = React.useState({});
    const classes=useStyles();
    function handleToggleModal(data){
        setSelectedData(data);
        setDateModal(!dateModal);
    }
    const [dateModal, setDateModal]= React.useState(false);
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
        <>
            <VictoryChart
                style={{

                }}
                domainPadding={20}>
                <VictoryAxis
                    style={{
                        axis: {
                            fill: "#ffffff",
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
                    tickValues={data.map((datum, idx) => idx + 1)}
                    tickFormat={data.map(datum => datum.day)}
                    label="Date"
                />
                <VictoryAxis
                    style={{
                        axis: {
                            fill: "#ffffff",
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
                {<VictoryBar
                    events={[{
                        target: "labels",
                        eventHandlers: {
                            onClick: () => {return [{ target: "data", mutation: (props) =>handleToggleModal(props.datum) }];}
                        }
                    }]}
                    data={data.map(({ day, mood, hours }) => {
                        return { day: day, hasComment: true, hours: hours, mood: mood * graphHeight / 4 };
                    })}
                    labels={data.map(({ mood, hasComment, hours }) => showMood ? moods[mood - 1] + `${hasComment ? "" : "💬"}` : `${hours} ${/*hasComment ? "" : */"💬"}`)}
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
                {showHours && <VictoryLine
                    style={{
                        data: {
                            stroke: "#ffffff",
                        },
                        labels: {
                            fill: "#ffffff",
                        },
                    }}
                    data={data}
                    //labels={showMood ? [] : ({ datum }) => `${datum.hours} hrs ${/*hasComment ? "" : */"💬"}`}
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
                        <SleepDetail {...selectedData}/>
                    </Paper>
                </Fade>
            </Modal>
        </>
    );
}
