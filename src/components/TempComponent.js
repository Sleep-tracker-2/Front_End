import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewEntry from "./NewEntry";
import { makeStyles } from "@material-ui/core/styles";


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
    },
    addButton: {
        position: "fixed",
        bottom: 20,
        right: 20,
    }
}));


export default function ModalTemp() {
    function toggleModal(){
        setNewEntryModal(!newEntryModal);
    }
    const classes = useStyles();
    const [newEntryModal, setNewEntryModal] = React.useState(false);
    return (
        <>
            <Fab className={classes.addButton} color="primary" aria-label="add" onClick={toggleModal}>
                <AddIcon />
            </Fab>

            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
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
                        <NewEntry />
                    </Paper>
                </Fade>
            </Modal>
        </>
    );
}