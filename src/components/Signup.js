import React from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import axios from 'axios';
import { connect } from 'react-redux';

import { axiosWithAuth } from '../utils/axiosWithAuth'

import { loginUser } from '../actions';

// import axios from "../utils/axiosWithAuth"

const Signup = (props) => {
    const history = useHistory();
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
                    } else if (!/^[A-Z0-9._%+-]/i.test(values.username) || values.username.includes(" ")) {
                        errors.username = 'Invalid username';
                    }
                    if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = 'Passwords do not match';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const submitValues = {
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
                            console.log(res);
                            setSubmitting(false);
                            return submitValues;
                        })
                        .then(values => {
                            axiosWithAuth()
                                .post(
                                    'users/login',
                                    values
                                )
                                .then(res => {
                                    localStorage.setItem('token', res.data.token);
                                    localStorage.setItem('user', JSON.stringify(res.data.user));
                                    console.log(res)
                                    props.loginUser(res.data.user)
                                    console.log("LOGIN", props)

                                    setTimeout(() => {
                                        history.push('/userdash');
                                    }, 1000)

                                })
                                .catch(err => {
                                    setSubmitting(false)
                                });
                        })
                        .catch(err => {
                            
                                setSubmitting(false)
                            
                        });
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className='modal-box'>
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

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(Signup);
