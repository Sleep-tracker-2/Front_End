import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import {axiosWithAuth} from '../utils/axiosWithAuth'

import {loginUser} from '../actions';

const Login = (props) => {
    const history = useHistory();

    console.log(props)
    
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

const mapStateToProps = state => {
	return {
	  user: state.user
	};
  };
  
  export default connect(
    mapStateToProps,
    {loginUser}
  )(Login);
