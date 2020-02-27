
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Splash from "./components/Splash";

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
				// <PrivateRoute exact path='/sleep' component={SleepGraph} />
			}

			{
				// <Footer />
			}
		</div>
	);
}

export default App;
