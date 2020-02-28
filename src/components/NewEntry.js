import 'date-fns';
import 'typeface-roboto';
import React from 'react';
import { Grid, Container, Typography, TextField, Select, MenuItem, InputLabel, Button, FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from '@material-ui/pickers';
const moods = ["😡", "😔", "😐", "😄"];

const initialState = {
    mood: '',
    date: null,
    start_time: null,
    end_time: null,
    /*hours: 8,*/
    comment: ""
};

export default function MaterialUIPickers() {
    // The first commit of Material-UI
    const [state, setState] = React.useState(initialState);
    const [attempts, setAttempts] = React.useState(0);

    const handleChangePicker = name => value => {
        setState({ ...state, [name]: value });
    };
    const handleChangeEvent = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    }
    const resetForm = () => {
        setState(initialState);
    }
    const handleSubmit = () => {
        setAttempts(attempts+1);
        for(const item in state){
             if(!state[item]&&item!=='comment')return;
        }
        console.log("Submitted!");
        setAttempts(0);
        resetForm();
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container maxWidth="sm">
                <Grid container direction="column" spacing={2}>

                    <Typography variant='h2'>New Entry:</Typography>
                    {/*   <Grid container justify="space-between" alignItems="baseline"> */}
                    <DatePicker
                        error={!state.date && attempts>0}
                        required
                        initialFocusedDate={new Date(Date.now() - 1000 * 3600 * 24).toDateString()}
                        autoOk={true}
                        disableFuture={true}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        value={state.date}
                        onChange={handleChangePicker('date')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}

                    />
                    {/* <TextField InputProps={{ readOnly: true }} value={`${state.hours} hours of sleep`} align="center" />
                    </Grid>*/}
                    {/* <Grid container justify="space-between" alignItems="baseline">*/}
                    <TimePicker
                        error={!state.start_time && attempts > 0}
                        required
                        variant="inline"
                        margin="normal"
                        id="time-picker"
                        label="What time did you go to bed?"
                        value={state.start_time}
                        onChange={handleChangePicker('start_time')}
                        KeyboardButtonProps={{
                            'aria-label': 'change start time',
                        }}
                    />
                    <TimePicker
                        error={!state.start_time && attempts > 0}
                        required
                        variant="inline"
                        margin="normal"
                        id="time-picker"
                        label="What time did you wake up?"
                        value={state.end_time}
                        onChange={handleChangePicker('end_time')}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                    {/* </Grid> */}
                    <FormControl>
                        <InputLabel id="mood-select-label">How are you feeling?</InputLabel>
                        <Select
                            error={!state.mood && attempts > 0}
                            required
                            abelId="mood-select-label"
                            name="mood"
                            value={state.mood}
                            onChange={handleChangeEvent}
                        >
                            <MenuItem value={4}>{moods[3]}</MenuItem>
                            <MenuItem value={3}>{moods[2]}</MenuItem>
                            <MenuItem value={2}>{moods[1]}</MenuItem>
                            <MenuItem value={1}>{moods[0]}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Notes on sleep pattern, dreams, epiphanies ..."
                        value={state.comment}
                        name="comment"
                        onChange={handleChangeEvent}
                    />
                    <Grid container justify="flex-start" alignItems="baseline">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >Submit</Button>
                        <Button
                            variant="contained"
                            onClick={resetForm}
                        >Reset</Button>
                    </Grid>
                </Grid>
            </Container>
        </MuiPickersUtilsProvider>
    );
}
