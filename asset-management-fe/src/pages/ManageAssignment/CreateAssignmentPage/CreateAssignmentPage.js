import React, {useState} from "react";
import './CreateAssignmentPage.css'
import {Button, Col, Form, Row, Dropdown, DropdownButton} from "react-bootstrap";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';
import useFetch from "../../../hooks/useFetch";
import {API_URL, TODAY, YESTERDAY} from "../../../common/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faPlus} from '@fortawesome/free-solid-svg-icons'
import moment from "moment";

const validateForm = Yup.object().shape({
    user: Yup.string().required("Required!"),
    asset: Yup.string().required("Required!"),
    note: Yup.string().required("Required!"),
    assignedDate: Yup
        .date()
        .required("Required!")
        .min(TODAY, "Date cannot be in the past")
})
const convertDataResponse = res => res.data;

const CreateAssignmentPage = () => {
    let history = useHistory();

    const {
        data: categories,
    } = useFetch([], `${API_URL}/categories`, convertDataResponse);
    console.log("cate", categories)
    const handleRedirectAssignmentManagePage = () => {
        history.push("/assignment")
    }

    let curDate = moment(Date.now()).format("YYYY-MM-DD");

    const initialValues = {
        user: "",
        asset: "",
        note: "",
        assignedDate: curDate
    }

    const submit = (values, {resetForm}) => {
        console.log("value on submit =", values);
        history.push("/Assignment")
        resetForm();
    }
    return (
        <div className="app-page">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Create New Assignment</div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validateForm}
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
                                <Form.Group as={Row} className="mb-3" controlId="formTextFullName">
                                    <Form.Label column sm="3">User</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="user"
                                            defaultValue={values.user}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.user && errors.user}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.user}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Control.Feedback type="invalid">
                                    {errors.user}
                                </Form.Control.Feedback>
                                <Form.Group as={Row} className="mb-3" controlId="formTextAssetName">
                                    <Form.Label column sm="3">Asset</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="asset"
                                            defaultValue={values.asset}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.asset && errors.asset}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.asset}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextAssignedDate">
                                    <Form.Label column sm="3">Assigned Date</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="assignedDate"
                                            type="date"
                                            value={values.assignedDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.assignedDate && errors.assignedDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.assignedDate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextareaNote">
                                    <Form.Label column sm="3">Note</Form.Label>
                                    <Col sm="6">
                                        <Form.Control rows={4}
                                                      as="textarea"
                                                      name="note"
                                                      value={values.note}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      isInvalid={touched.note && errors.note}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.note}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <div className="group-btn">
                                    <Button type="submit" className="btn-primary"
                                            disabled={!values.user || !values.asset || !values.note || !values.assignedDate}
                                    >
                                        Save
                                    </Button>
                                    <Button className="btn-cancel" type="reset" onClick={handleRedirectAssignmentManagePage}>
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
export default CreateAssignmentPage;
