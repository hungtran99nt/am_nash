import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AGE_LIMIT, API_URL, ISO_WEEKEND} from "../../../common/constants";
import Error from "../../Error/Error";

const validateForm = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    birthDate: Yup.date().max(new Date(Date.now() - AGE_LIMIT), "User is under 18. Please select a different date")
        .required("Invalid date. Please select a different date"),
    type: Yup.string().required("Required!")
});

const validation = ({birthDate, joinedDate}) => {
    const errors = {};

    if (!joinedDate) {
        errors.joinedDate = "Invalid date. Please select a different date";
        return errors;
    }
    let isoWeekday = moment(joinedDate).isoWeekday();
    if (moment(joinedDate).isBefore(birthDate)) {
        errors.joinedDate = "Joined date is not later than Date of Birth. Please select a different date";
    } else if (ISO_WEEKEND.includes(isoWeekday)) {
        errors.joinedDate = "Joined date is Saturday or Sunday. Please select a different date"
    } else if (moment(joinedDate).isAfter(Date.now())) {
        errors.joinedDate = "Joined date is not future day. Please select a different date"
    }
    return errors;
}

const CreateUserPage = () => {
    const initialValues = {firstName: "", lastName: "", birthDate: "", gender: "Female", joinedDate: "", type: ""};

    let history = useHistory();

    const handleRedirectUseManagePage = () => {
        history.push("/user");
    }

    const submit = (values, {resetForm}) => {
        axios({
            method: 'POST',
            url: `${API_URL}/users/`,
            data: {
                firstName: values.firstName,
                lastName: values.lastName,
                birthDate: values.birthDate,
                gender: values.gender,
                joinedDate: values.joinedDate,
                type: values.type
            }
        }).then(res => {
            // console.log("res = ", res);
            console.log('create user success.');
            history.push("/user", {firstId: res.data.id});
        }).catch(err => {
            console.log("err = ", err);
            return <Error message={err.response.data.message}/>
        }).finally(
            resetForm()
        );
    }
    return (
        <div className="app-page">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Create New User</div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validateForm}
                        validate={validation}
                        onSubmit={submit}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3" controlId="formTextFirstName">
                                    <Form.Label column sm="3">First Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.firstName && errors.firstName}

                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextLastName">
                                    <Form.Label column sm="3">Last Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            onBlur={handleBlur}
                                            isInvalid={touched.lastName && errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextBirthDate">
                                    <Form.Label column sm="3">Date Of Birth</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="birthDate"
                                            type="date"
                                            value={values.birthDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.birthDate && errors.birthDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.birthDate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                        Gender
                                    </Form.Label>
                                    <Col sm="6">
                                        <div className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Female"
                                                name="gender"
                                                type="radio"
                                                value="Female"
                                                defaultChecked={true}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Male"
                                                name="gender"
                                                type="radio"
                                                value="Male"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                        Joined Date
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="joinedDate"
                                            type="date"
                                            value={values.joinedDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.joinedDate && errors.joinedDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.joinedDate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">Type</Form.Label>
                                    <Col sm="6">
                                        <Form.Select
                                            name="type"
                                            value={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.type && errors.type}
                                        >
                                            <option value=""/>
                                            <option value="Staff" label="Staff"/>
                                            <option value="Admin" label="Admin"/>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.type}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <div className="group-btn">
                                    <Button type="submit" className="btn-primary"
                                            disabled={!values.firstName || !values.lastName ||
                                            !values.birthDate || !values.joinedDate ||
                                            errors.birthDate || errors.joinedDate || !values.type}>
                                        Save
                                    </Button>
                                    <Button className="btn-cancel" type="reset" onClick={handleRedirectUseManagePage}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="col-lg-2"/>
            </div>
        </div>
    )
}
export default CreateUserPage