import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import {useHistory, useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {API_URL} from "../../../common/constants";

const validateForm = Yup.object().shape({
    birthdate: Yup.date().max(new Date(Date.now() - 567648000000), "User is under 18. Please select a different date")
        .required("Required"),
    type: Yup.string().required("Required!")
})
const validatioedit = (values) => {
    const errors = {};
    let isWeekend = moment(values.joinDate).isoWeekday();
    if (!values.joinDate) {
        errors.joinDate = "Required";
    } else if (moment(values.joinDate).isBefore(moment(values.joinDate))) {
        errors.joinDate = "Joined date is not later than Date of Birth. Please select a different date";
    } else if (isWeekend === 7 || isWeekend === 6) {
        errors.joinDate = "Joined date is Saturday or Sunday. Please select a different date"
    }
    return errors;
}
const convertDataResponse = res => (
    {
        firstname: res.data.firstName,
        lastname: res.data.lastName,
        birthdate: moment(res.data.birthDate).format("YYYY-MM-DD"),
        joinDate: moment(res.data.joinDate).format("YYYY-MM-DD"),
        type: res.data.type,
        gender: res.data.gender
    }
);

const EditUserPage = () => {
    let history = useHistory();
    const handleRedirectUseManagePage = () => {
        history.push("/user");
    }
    const {id} = useParams();
    const {
        isLoading,
        data: user,
        errorMessage,
    } = useFetch({
        firstname: null,
        lastname: null,
        birthdate: null,
        joinDate: null,
        type: null,
        gender: null
    }, `${API_URL}/users/${id}`, convertDataResponse);

    console.log("user = ", user);

    const initialValues = {
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        joinDate: user.joinDate,
        type: user.type,
        gender: user.gender
    }
    if (isLoading) return "Loading";
    if (errorMessage) return <div style={{color: "red"}}>{errorMessage}</div>;
    console.log("user = ", user);
    const submit = (values, {resetForm}) => {
        console.log('values =', values)
        resetForm();
        history.push("/user");
    }
    return (
        <div className="app-create">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Edit User {user.firstname} {user.lastname}</div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validateForm}
                        validate={validatioedit}
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
                                    <Form.Label column sm="2">First Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="firstname"
                                            defaultValue={values.firstname}
                                            disabled={true}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstname}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextLastName">
                                    <Form.Label column sm="2">Last Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="lastname"
                                            defaultValue={values.lastname}
                                            disabled={true}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastname}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextBirthDate">
                                    <Form.Label column sm="2">Date Of Birth</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="birthdate"
                                            type="date"
                                            value={values.birthdate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.birthdate && errors.birthdate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.birthdate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
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
                                                checked={values.gender === "Female"}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Male"
                                                name="gender"
                                                type="radio"
                                                value="Male"
                                                checked={values.gender === "Male"}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Joined Date
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="joinDate"
                                            type="date"
                                            defaultChecked={user.joinDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.joinDate && errors.joinDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.joinDate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Type</Form.Label>
                                    <Col sm="6">
                                        <Form.Select
                                            name="type"
                                            defaultValue={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.type && errors.type}
                                        >
                                            <option value=""/>
                                            <option value="Staff" defaultChecked={values.type === "Staff"}
                                                    label="Staff"/>
                                            <option value="Admin" defaultChecked={values.type === "Admin"}
                                                    label="Admin"/>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.type}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <div className="group-btn">
                                    <Button type="submit" className="btn-primary"
                                            disabled={!values.firstname || !values.lastname ||
                                            !values.birthdate || !values.joinDate ||
                                            errors.birthdate || errors.joinDate || !values.type}
                                    >
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
export default EditUserPage