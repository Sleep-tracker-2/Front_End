import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import axios from 'axios';

const Signup = () => {
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    } else if (!/^[A-Z0-9._%+-]/i.test(values.username)||values.username.includes(" ")) {
                        errors.username = 'Invalid username';
                    }
                    if(values.password!==values.confirmPassword){
                        errors.confirmPassword= 'Passwords do not match';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const submitValues={
                        username: values.username,
                        password: values.password
                    };
                    setSubmitting(true);
                    axios
                        .post(
                            'https://sleeptracker2.herokuapp.com/api/users/register',
                            submitValues
                        )
                        .then(res => {
                            console.log(res.status);
                            setSubmitting(false);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className='user-entry'>
                        <Field
                            component={TextField}
                            name='username'
                            type='username'
                            label='Username'
                        />
                        <br />
                        <Field
                            component={TextField}
                            type='password'
                            label='Password'
                            name='password'
                        />
                        <Field
                            component={TextField}
                            type='password'
                            label='Confirm Password'
                            name='confirmPassword'
                        />
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={isSubmitting}
                            onClick={submitForm}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Signup;
