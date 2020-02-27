import React from "react";
import { Container, Button } from "@material-ui/core";

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

function Splash() {
	return (
		<div style={splashStyle} className='splash'>
			<h1 className='splashTitle'>Sleep is Good! Get it!</h1>
			<Button style={buttonStyle} variant='outlined'>
				Track your Sleep >>
			</Button>
		</div>
	);
}

export default Splash;
