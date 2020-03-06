import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import stringifyDate from "./StringifyDate";
export default function SleepDetail(props) {
    console.log(props);
    let sleepTime = new Date("1990-10-27T"+props.started_sleep);
    let wakeTime = new Date("1990-10-27T" + props.ended_sleep);
    return props.day ? (
        <Container>
            <Typography variant="h4">{props.day + ": " + props.moods[props.mood - 1]}</Typography>
            <Typography variant="p">{"Fell asleep: " + stringifyDate(sleepTime, "g:i A")}</Typography><br />
            <Typography variant="p">{"Woke up: " + stringifyDate(wakeTime, "g:i A")}</Typography><br />
            <Typography variant="p">{"Hours: " + props.hours}</Typography><br />
            {props.comment && <Typography variant="p">{"Notes: " + props.comment}</Typography>}
        </Container>
    )
        : <div />;
}