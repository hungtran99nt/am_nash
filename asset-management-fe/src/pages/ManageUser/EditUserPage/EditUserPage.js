import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import {useHistory, useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {API_URL, DATE_FORMAT} from "../../../common/constants";

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
        birthdate: moment(res.data.birthDate).format("MM/DD/YYYY"),
        joinDate: moment(res.data.joinDate).format("MM/DD/YYYY"),
        type: res.data.type,
        gender: res.data.gender
    }
);

// `${API_URL}/users/${id}`
const EditUserPage = () => {
    const {id} = useParams();
    const {
        isLoading,
        data: users,
        errorMessage,
    } = useFetch({
        firstname: null,
        lastname: null,
        birthdate: null,
        joinDate: null,
        type: null,
        gender: null
    }, `${API_URL}/users/${id}`, convertDataResponse);
    if (isLoading) return "Loading";
    if (errorMessage) return <div style={{ color: "red" }}>{errorMessage}</div>;
    console.log("user = ", users);
    const [initialValues,setInitialValues] = useState([]);
    setInitialValues({
        firstname: users.firstname,
        lastname: users.lastname,
        birthdate: moment(users.birthdate).toDate(),
        gender: users.gender,
        joinDate: moment(users.joinDate).toDate(),
        type: users.type
    })
    console.log('initialValues', initialValues)

    // let history = useHistory();
    // const handleRedirectUseManagePage = () => {
    //     history.push("/user");
    // }
    const submit = (values, {resetForm}) => {
        console.log(moment(values.joinDate))
        console.log('values =', values)
        resetForm();
        // history.push("/user");
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
                                            value={values.firstname}
                                            disabled={true}
                                            onChange={handleChange('firstname')}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextLastName">
                                    <Form.Label column sm="2">Last Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="lastname"
                                            value={values.lastname}
                                            disabled={true}
                                        />
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
                                                Checked={values.gender === "Female"}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="Male"
                                                name="gender"
                                                type="radio"
                                                value="Male"
                                                Checked={values.gender === "Male"}
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
                                            value={values.joinDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.joineDate && errors.joinDate}
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
                                            value={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.type && errors.type}
                                        >
                                            <option value=""/>
                                            {/*selected={values.type.equals("Staff")}*/}
                                            <option value="Staff"  label="Staff"/>
                                            <option value="Admin"  label="Admin"/>
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
                                            errors.birthdate || errors.joinDate || !values.type}>
                                        Save
                                    </Button>
                                    <Button className="btn-cancel" type="reset" >
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