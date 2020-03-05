import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import NewEntry from "./NewEntry";
import SleepGraphContainer from "./SleepGraphContainer";
import { useHistory } from "react-router-dom";

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

function SleepTrackerButtons({ buttonStyle, page }) {
    const history = useHistory();
    const classes = useStyles();

    const [entryModal, setEntryModal] = React.useState(page === "new_entry");
    const [graphModal, setGraphModal] = React.useState(page === "sleep");

    const handleNewEntry = () => {
        entryModal
            ? history.push("/")
            : history.push("/new_entry");
    };

    const handleGraph = () => {
        graphModal
            ? history.push("/")
            : history.push("/sleep");
    };

    return (
        <>
            <ButtonGroup
                variant='text'
                color='primary'
                aria-label='text primary button group'
            >
                <Button style={buttonStyle} onClick={handleNewEntry}>
                    New Entry
			</Button>
                <Button style={buttonStyle} onClick={handleGraph}>
                    View Sleep
			</Button>

            </ButtonGroup>


            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={entryModal}
                onClose={handleNewEntry}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 100
                }}
            >
                <Fade in={entryModal}>
                    <Paper elevation={3}>
                        <NewEntry />
                    </Paper>
                </Fade>
            </Modal>


            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={graphModal}
                onClose={handleGraph}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 100
                }}
            >
                <Fade in={graphModal}>
                    <Paper elevation={3}>
                        <SleepGraphContainer />
                    </Paper>
                </Fade>
            </Modal>

        </>

    );
}

export default SleepTrackerButtons;
