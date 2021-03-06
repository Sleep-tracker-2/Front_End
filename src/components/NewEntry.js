import "date-fns";
import "typeface-roboto";
import React, { useReducer } from "react";
import { connect } from "react-redux";
import { reducer, initialState } from "../reducers";
import stringifyDate from "./StringifyDate";

import {
  Grid,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { postSleepData, getSleepData } from "../actions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router";

const initialForm = {
  mood: "",
  date: null,
  start_time: null,
  end_time: null,
  comment: ""
};

function NewEntryForm(props) {
  const history = useHistory();

  const [formState, setFormState] = React.useState(initialForm);
  const [attempts, setAttempts] = React.useState(0);

  const handleChangePicker = name => value => {
    setFormState({ ...formState, [name]: value });
  };
  const handleChangeEvent = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const resetForm = () => {
    setFormState(initialForm);
  };
  const handleSubmit = () => {
    setAttempts(attempts + 1);
    for (const item in formState) {
      if (!formState[item] && item !== "comment") return;
    }
    console.log("StartDATE", formState.date);
    const formDate = new Date(formState.date);
    const entry = {
      started_sleep: `${formState.start_time.getHours()}:${formState.start_time.getMinutes()}:${formState.start_time.getSeconds()}`,
      ended_sleep: `${formState.end_time.getHours()}:${formState.end_time.getMinutes()}:${formState.end_time.getSeconds()}`,
      mood: formState.mood,
      date: stringifyDate(formDate, "Y-m-d H:i:s"),
      comment: formState.comment
    };

    console.log("FORM", entry);
    props.postSleepData(entry);
    props.toggleModal();
    props.getSleepData();
    setAttempts(0);
    resetForm();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth="lg" className="modal-box" style={{ width: "450px" }}>
        <Grid container direction="column">
          <Typography variant="h3">New Entry</Typography>
          {/*   <Grid container justify="space-between" alignItems="baseline"> */}
          <KeyboardDatePicker
            error={!formState.date && attempts > 0}
            required
            initialFocusedDate={new Date(
              Date.now() - 1000 * 3600 * 24
            ).toDateString()}
            autoOk={true}
            disableFuture={true}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="What night is this for?"
            value={formState.date}
            onChange={handleChangePicker("date")}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          {/* <TextField InputProps={{ readOnly: true }} value={`${formState.hours} hours of sleep`} align="center" />
                    </Grid>*/}
          {/* <Grid container justify="space-between" alignItems="baseline">*/}
          <KeyboardTimePicker
            error={!formState.start_time && attempts > 0}
            autoOk={true}
            required
            variant="inline"
            margin="normal"
            id="time-picker"
            label="What time did you go to bed?"
            value={formState.start_time}
            onChange={handleChangePicker("start_time")}
            KeyboardButtonProps={{
              "aria-label": "change start time"
            }}
          />
          <KeyboardTimePicker
            error={!formState.end_time && attempts > 0}
            autoOk={true}
            required
            variant="inline"
            margin="normal"
            id="time-picker"
            label="What time did you wake up?"
            value={formState.end_time}
            onChange={handleChangePicker("end_time")}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
          {/* </Grid> */}
          <FormControl>
            <InputLabel
              error={!formState.mood && attempts > 0}
              id="mood-select-label"
            >
              How are you feeling?
            </InputLabel>
            <Select
              error={!formState.mood && attempts > 0}
              required
              abelId="mood-select-label"
              name="mood"
              value={formState.mood}
              onChange={handleChangeEvent}
            >
              <MenuItem value={4}>{props.sleep.moods[3]}</MenuItem>
              <MenuItem value={3}>{props.sleep.moods[2]}</MenuItem>
              <MenuItem value={2}>{props.sleep.moods[1]}</MenuItem>
              <MenuItem value={1}>{props.sleep.moods[0]}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Notes on sleep pattern, dreams, epiphanies ..."
            value={formState.comment}
            name="comment"
            onChange={handleChangeEvent}
          />
          <Grid
            container
            item
            justify="flex-start"
            alignItems="baseline"
            style={{ marginTop: "7px" }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              {" "}
              <Button
                color="secondary"
                variant="contained"
                onClick={resetForm}
                type="submit"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
const mapStateToProps = state => {
  return {
    sleep: state.sleep
  };
};

export default connect(mapStateToProps, { postSleepData, getSleepData })(
  NewEntryForm
);
