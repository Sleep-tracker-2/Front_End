import React from "react";
import { Container } from "@material-ui/core";

function Splash() {
	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<h1>Sleep!</h1>
		</Container>
	);
}

export default Splash;
