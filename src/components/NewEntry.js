import React from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";


function SleepEntryForm({ errors, touched, status, submitCount }) {
    /*const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers([...users, status]);
    }, [status]);*/
    return (
        <div>
            <Form className="user-form">
                <h3>New User Sign-Up</h3>
                <label>Name:
                <Field name="name"
                        className={
                            (submitCount > 0 && errors.name)
                                ? "error"
                                : ""
                        } />
                    {
                        (submitCount > 0 && errors.name)
                        && <p className="error-message">{errors.name}</p>
                    }
                </label>
            </Form>
        </div>
    );
}

export default withFormik({
    mapPropsToValues: () => ({
        date: "",
        startTime: "",
        endTime: "",
        mood: "",
        comment: ""
    }),
   /* validationSchema: yup.object().shape({
        name: yup
            .string()
            .required("Please enter your name"),
        email: yup
            .string()
            .required("Please enter your email address")
            .email("Please enter a valid email address"),
        password: yup
            .string()
            .required("Please enter a password")
            .min(8, "Must be at least 8 characters long.")
            .notOneOf([yup.ref('name'), yup.ref('email')], "Cannot match name or email."),
        confirmPassword: yup
            .string()
            .required("Please confirm your password")
            .oneOf([yup.ref('password')], "Entered passwords do not match."),
        acceptedTOS: yup
            .boolean()
            .oneOf([true], "You must accept the terms of service.")
    }),
    handleSubmit: (values, { resetForm, setStatus, setSubmitting }) => {
        setSubmitting(true);
        axios
            .post("https://reqres.in/api/users/",
                {
                    ...values,
                    confirmPassword: null
                })
            .then(res => {
                //console.log(res);
                setStatus(res.data);
                setSubmitting(false);
                resetForm();
            })
            .catch(console.error);
    }*/
})(SleepEntryForm);