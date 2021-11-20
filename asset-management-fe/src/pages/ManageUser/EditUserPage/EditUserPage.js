import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import {useHistory,useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {API_URL, DATE_FORMAT} from "../../../common/constants";

const validateForm = Yup.object().shape({
    birthdate: Yup.date().max(new Date(Date.now() - 567648000000), "User is under 18. Please select a different date")
        .required("Required"),
    type: Yup.string().required("Required!")
})
const validation = (values) => {
    const errors = {};
    let isWeekend = moment(values.joineddate).isoWeekday();
    if (!values.joineddate) {
        errors.joineddate = "Required";
    } else if (moment(values.joineddate).isBefore(moment(values.birthdate))) {
        errors.joineddate = "Joined date is not later than Date of Birth. Please select a different date";
    } else if (isWeekend === 7 || isWeekend === 6) {
        errors.joineddate = "Joined date is Saturday or Sunday. Please select a different date"
    }
    return errors;
}
const convertDataResponse = res =>(
    {
        firstname: res.date.firstName,
        lastname:res.data.lastName,
        birthdate: moment(res.data.birthDate).format(DATE_FORMAT.TO),
        joinDate:  moment(res.data.joinDate).format(DATE_FORMAT.TO),
        type: res.data.type,
        gender: res.data.gender
    }
);
const EditUserPage = () => {
    const {id} = useParams();
    const {
        isLoading,
        data: users,
        errorMessage
    } = useFetch([], `${API_URL}/users/${id}`, convertDataResponse);
    console.log(users);
    const initialValues = {firstname: users.firstname, lastname: users.lastname,
        birthdate: users.birthdate, gender: users.gender, joineddate: users.joineddate, type: users.type};
    let history = useHistory();
    const handleRedirectUseManagePage = () => {
        history.push("/user");
    }
    const submit = (values, {resetForm}) => {
        console.log(moment(values.joineddate))
        console.log('values =', values)
        resetForm();
        history.push("/user");
    }
    return (
        <div className="app-create">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Edit User</div>
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
                              isSubmitting,
                              resetForm,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3" controlId="formTextFirstName">
                                    <Form.Label column sm="2">First Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="firstname"
                                            value={values.firstname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.firstname && errors.firstname}
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
                                            onChange={handleChange}
                                            value={values.lastname}
                                            onBlur={handleBlur}
                                            isInvalid={touched.lastname && errors.lastname}
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
                                                value="female"
                                                defaultChecked={true}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Male"
                                                name="gender"
                                                type="radio"
                                                value="male"
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
                                            name="joineddate"
                                            type="date"
                                            value={values.joineddate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.joineddate && errors.joineddate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.joineddate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Type</Form.Label>
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
                                            disabled={!values.firstname || !values.lastname ||
                                            !values.birthdate || !values.joineddate ||
                                            errors.birthdate || errors.joineddate || !values.type}>
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