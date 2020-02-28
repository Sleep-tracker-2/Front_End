import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import PrivateRoute from "./utils/PrivateRoute";
import SleepGraphContainer from "./components/SleepGraphContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
	return (
		<div>
			<Route exact path='/' component={Splash} />

			<Route exact path='/signup' component={Signup} />
			<Route exact path='/login' component={Login} />

			<PrivateRoute exact path='/sleep' component={SleepGraphContainer} />

			{
				// <Footer />
			}
		</div>
	);
}

export default App;
