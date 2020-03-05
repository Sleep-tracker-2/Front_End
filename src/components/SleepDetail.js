import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
export default function SleepDetail(props) {
    console.log(props);
    return props.day ? (
        <Container>
            <Typography variant="h4">{props.day}</Typography>
            <Typography variant="p">{"Hours: " + props.hours}</Typography>
        </Container>
    )
        : <div />;
}