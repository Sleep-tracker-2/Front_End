import React, { useState, useEffect } from "react";
import { Container, Button, ButtonGroup } from "@material-ui/core";
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import SleepTrackerButtons from "./SleepTrackerButtons";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";


const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#0f4c75',
		},
		secondary: {
			main: '#bbe1fa',
		}
	},
});

function Splash({ page }) {
	const [token, setToken] = useState(localStorage.getItem("token"));

	useEffect(() => {
		// localStorage.setItem("token", "40019e");
		// setToken(localStorage.getItem("token"));
	}, []);

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

	const LinkBehavior = React.forwardRef((props, ref) => (
		<RouterLink ref={ref} to='/sleep' {...props} />
	));

	const buttonStyle = {
		color: "black",
		borderColor: "black"
	};

	return (
		<div style={splashStyle} className='splash'>
			<h1 className='splashTitle'>Sleep is Good! Get it!</h1>
			<ThemeProvider theme={theme} >
				{!token ? (
					<AuthButtons buttonStyle={buttonStyle} page={page} />
				) : (
						<SleepTrackerButtons buttonStyle={buttonStyle} page={page} />
						/*
						<Button component={LinkBehavior} style={buttonStyle}>
							Track your Sleep &gt;&gt;
						</Button>*/
					)

				}
			</ThemeProvider>
		</div>
	);
}

export default Splash;
