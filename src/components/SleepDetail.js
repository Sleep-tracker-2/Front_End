import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
export default function SleepDetail(props) {
    console.log(props);
    return props.day ? (
        <Container>
            <Typography variant="h4">{props.day + ": " + props.moods[props.mood - 1]}</Typography>
            <Typography variant="p">{"Fell asleep: " + props.started_sleep.slice(0, 5)}</Typography><br />
            <Typography variant="p">{"Woke up: " + props.ended_sleep.slice(0, 5)}</Typography><br />
            <Typography variant="p">{"Hours: " + props.hours}</Typography><br />
            {props.comment && <Typography variant="p">{"Notes: " + props.comment}</Typography>}
        </Container>
    )
        : <div />;
}