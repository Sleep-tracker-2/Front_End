import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import NewEntry from "./NewEntry";
import SleepGraphContainer from "./SleepGraphContainer";

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

function SleepTrackerButtons({ buttonStyle }) {
    const classes = useStyles();

    const [entryModal, setEntryModal] = React.useState(false);
    const [graphModal, setGraphModal] = React.useState(false)

    const handleNewEntry = () => {
        setEntryModal(!entryModal);
    };

    const handleGraph = () => {
        setGraphModal(!graphModal);
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
                    timeout: 500
                }}
            >
                <Fade in={entryModal}>
                    <NewEntry />
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
                    timeout: 500
                }}
            >
                <Fade in={graphModal}>
                    <SleepGraphContainer />
                </Fade>
            </Modal>

        </>

    );
}

export default SleepTrackerButtons;
