import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    } else if (!/^[A-Z0-9._%+-]/i.test(values.username)) {
                        errors.username = 'Invalid username';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    axios
                        .post(
                            'https://sleeptracker2.herokuapp.com/api/users/login',
                            values
                        )
                        .then(res => {
                            localStorage.setItem('token', res.data.token);
                            console.log(res)
                            history.push('/redirect');
                        })
                        .catch(err => console.log(err));
                       
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className='modal-box'>
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

export default Login;
