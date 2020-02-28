import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const Login = () => {
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
                    } else if (
                        !/^[A-Z0-9._%+-]/i.test(
                            values.username
                        )
                    ) {
                        errors.username = 'Invalid username';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className="user-entry">
                        <div className="user-entry-fields">
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
                        <Button className="user-entry-button"
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
