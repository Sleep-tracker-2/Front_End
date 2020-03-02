/*
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
*/
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { useHistory } from "react-router-dom";

const Login = () => {
	const history = useHistory();
	return (
		<>
			<Formik
				initialValues={{
					username: "",
					password: ""
				}}
				validate={values => {
					const errors = {};
					if (!values.username) {
						errors.username = "Required";
					} else if (!/^[A-Z0-9._%+-]/i.test(values.username)) {
						errors.username = "Invalid username";
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						localStorage.setItem("token", "abcde");
						history.push("/redirect");
					}, 4000);

					// history.push("/");
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form className='user-entry'>
						<div className='user-entry-fields'>
							<Field
								component={TextField}
								name='username'
								type='username'
								placeholder='Username'
							/>
							<br />
							<Field
								component={TextField}
								type='password'
								name='password'
								placeholder='Password'
							/>
						</div>
						{isSubmitting && <LinearProgress />}
						<Button
							className='user-entry-button'
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Login;
