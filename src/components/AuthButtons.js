import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Login from "./Login";
import Signup from './Signup'

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

function AuthButtons({ buttonStyle }) {
	const classes = useStyles();

	const [loginModal, setLoginModal] = React.useState(false);
	const [signupModal, setSignupModal] = React.useState(false)

	const handleLogin = () => {
		setLoginModal(!loginModal);
	};

	const handleSignup = () => {
		setSignupModal(!signupModal);
	};

	return (
		<>
		<ButtonGroup
			variant='text'
			color='primary'
			aria-label='text primary button group'
		>
			<Button style={buttonStyle} onClick={handleLogin}>
				Log In
			</Button>
			<Button style={buttonStyle} onClick={handleSignup}>
				Sign Up
			</Button>

		</ButtonGroup>


			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={loginModal}
				onClose={handleLogin}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={loginModal}>
					<Login />
				</Fade>
			</Modal>


			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={signupModal}
				onClose={handleSignup}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={signupModal}>
					<Signup/>
				</Fade>
			</Modal>

		</>

	);
}

export default AuthButtons;
