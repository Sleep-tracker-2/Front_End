import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 200
		}
	}
}));

export default function Login(props) {
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	});
	const classes = useStyles();

	function handleChange(e) {
		setCredentials({
			...credentials,
			[e.target.name]: [e.target.value]
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(props);
		localStorage.setItem("token", "40018e");
		props.history.push("/");
	}

	return (
		<form
			className={classes.root}
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
		>
			<TextField
				id='username'
				label='Username'
				name='username'
				value={credentials.username}
				onChange={handleChange}
			/>
			<TextField
				type='password'
				id='password'
				label='Password'
				name='password'
				value={credentials.password}
				onChange={handleChange}
			/>
			<Button type='submit'>Login</Button>
		</form>
	);
}
