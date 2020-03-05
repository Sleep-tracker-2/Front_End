import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Splash from "./components/Splash";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PrivateRoute from "./utils/PrivateRoute";
import SleepGraphContainer from "./components/SleepGraphContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewEntry from "./components/NewEntry";
import UserDash from "./components/UserDash";

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

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Route exact path='/' component={Splash} />
			<Route exact path='/redirect' render={props => <Redirect to='/' />} />
			<Route exact path='/login' render={(params) => <Splash {...params} page="login" />} />
			<Route exact path='/signup' render={(params) => <Splash {...params} page="signup" />} />
			<Route exact path='/sleep' render={(params) => <Splash {...params} page="sleep" />} />
			<Route exact path='/new_entry' render={(params) => <Splash {...params} page="new_entry" />} />
			<Route exact path='/userdash' render={props => <UserDash {...props} />} />

			{
				// <Footer />
			}
		</ThemeProvider>
	);
}

export default App;
