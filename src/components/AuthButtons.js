import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Login from "./Login";

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
	const [loginModule, setLoginModule] = React.useState(false);

	const handleLogin = () => {
		setLoginModule(!loginModule);
	};

	// const RegisterBehavior = React.forwardRef((props, ref) => (
	// 	<RouterLink ref={ref} to='/signup' {...props} />
	// ));

	// const LoginBehavior = React.forwardRef((props, ref) => (
	// 	<RouterLink ref={ref} to='/login' {...props} />
	// ));

	return (
		<ButtonGroup
			variant='text'
			color='primary'
			aria-label='text primary button group'
		>
			<Button style={buttonStyle} onClick={handleLogin}>
				Login
			</Button>
			<Button style={buttonStyle}>Register</Button>

			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={loginModule}
				onClose={handleLogin}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={loginModule}>
					<Login />
				</Fade>
			</Modal>
		</ButtonGroup>
	);
}

export default AuthButtons;
