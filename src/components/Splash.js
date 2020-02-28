import React from "react";
import { Container, Button, ButtonGroup } from "@material-ui/core";
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink } from "react-router-dom";

const splashStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100vw",
	height: "100vh",
	backgroundColor: "#1b262c",
	color: "black",
	flexDirection: "column"
};

const buttonStyle = {
	color: "black",
	borderColor: "black"
};

const LinkBehavior = React.forwardRef((props, ref) => (
	<RouterLink ref={ref} to='/graph' {...props} />
));

function Splash() {
	return (
		<div style={splashStyle} className='splash'>
			<h1 className='splashTitle'>Sleep is Good! Get it!</h1>
			<ButtonGroup
				variant='text'
				color='primary'
				aria-label='text primary button group'
				style={buttonStyle}
			>
				<Button>One</Button>
				<Button>Two</Button>
				<Button>Three</Button>
			</ButtonGroup>
		</div>
	);
}

export default Splash;
