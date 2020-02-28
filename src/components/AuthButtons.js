import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink } from "react-router-dom";

function AuthButtons({ buttonStyle }) {
	const RegisterBehavior = React.forwardRef((props, ref) => (
		<RouterLink ref={ref} to='/signup' {...props} />
	));

	const LoginBehavior = React.forwardRef((props, ref) => (
		<RouterLink ref={ref} to='/login' {...props} />
	));

	return (
		<ButtonGroup
			variant='text'
			color='primary'
			aria-label='text primary button group'
		>
			<Button component={RegisterBehavior} style={buttonStyle}>
				Login
			</Button>
			<Button component={LoginBehavior} style={buttonStyle}>
				Register
			</Button>
		</ButtonGroup>
	);
}

export default AuthButtons;
