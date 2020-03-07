import React from "react";
import SleepGraphContainer from "./SleepGraphContainer";
import NewEntry from "./NewEntry.js";
import {

  Container,
  List,
  ListItem,
  Paper,
  Typography
} from "@material-ui/core";
import { initialState } from "../reducers";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";


import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "../actions";

const useStyles = makeStyles(theme => ({
  logoStyle: {
    position: "fixed",
    top: "10px",
    left: "10px",
    width: "13%"
  },
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
  },
  addButton: {
    position: "fixed",
    bottom: 20,
    right: 20
  },
  logoutButton: {
    position: "fixed",
    top: 20,
    right: 20
  }

}));

function UserDash(props) {

  function toggleModal() {
    setNewEntryModal(!newEntryModal);
  }
  const classes = useStyles();
  const [newEntryModal, setNewEntryModal] = React.useState(false);
  const history = useHistory();

  function handleLogOut() {
    localStorage.clear();
    props.logoutUser();
    history.push("/");
  }
  return (
    <div style={{ backgroundColor: "#1b262c" }}>
      <img
        src={require("../assets/ZLEEP.png")}
        className={classes.logoStyle}
      ></img>
      <Container maxWidth="md" style={{ padding: "50px 0px" }}>
        <Paper maxWidth="md">
          <Typography
            variant="h1"
            style={{ margin: "auto", textAlign: "center" }}
          >
            Sleep Tracker
          </Typography>
          <SleepGraphContainer />
          <List id="sleepList">
            {initialState.sleep.data.map(sleep => {
              return (
                <ListItem
                  style={{ justifyContent: "space-around" }}
                  key={Math.random() * 99 + 1}
                >
                  <Typography variant="p" className="sleep-data">
                    Date: {sleep.day}
                  </Typography>
                  <Typography variant="p" className="sleep-data">
                    Hours: {sleep.hours}
                  </Typography>
                  <Typography variant="p" className="sleep-data">
                    Mood: {sleep.mood}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Container>
      <Fab
        className={classes.addButton}
        color="primary"
        aria-label="add"
        onClick={toggleModal}
      >
        <AddIcon />
      </Fab>
      <Button
        style={{
          display: "flex",
          alignItems: "middle",
          backgroundColor: "#1b262c"
        }}
        className={classes.logoutButton}
        color="secondary"
        aria-label="logout"
        onClick={handleLogOut}
      >
        {"Sign out "}
        <ExitToAppIcon />
      </Button>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newEntryModal}
        onClose={toggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={newEntryModal}>
          <Paper elevation={3}>
            <NewEntry toggleModal={toggleModal} />
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { logoutUser })(UserDash);


// export default UserDash
