import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import PrivateRoute from "./utils/PrivateRoute";
import SleepGraphContainer from "./components/SleepGraphContainer";
function App() {
	return (
		<div>
			{
				//<NavBar />
			}
			<Route exact path='/' component={Splash} />
			{
				// <Route exact path='/signup' component={Signup} />
				// <Route exact path='/signin' component={Signin} />
				//
			}

			<PrivateRoute exact path='/sleep' component={SleepGraphContainer} />

			{
				// <Footer />
			}
		</div>
	);
}

export default App;
