import {useHistory, useParams} from "react-router-dom";
import {Formik} from "formik";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";
import useFetch from "../../../hooks/useFetch";
import {API_URL, FILTER_STATE_OPTIONS} from "../../../common/constants";
import moment from "moment";
import axios from "axios";
import jwt_decode from "jwt-decode";

const validateForm = Yup.object().shape({
    assetCode: Yup.string().required("Required!"),
    assignTo: Yup.string().required("Required!"),
    assignedDate: Yup.date().required("Required!"),
})
const convertDataResponse = res => res.data;
const convertDataAssignmentResponse = res => (
    {
        assetName: res.data.assetName,
        assetCode: res.data.assetCode,
        assignTo: res.data.assignTo,
        assignedDate: moment(res.data.assignedDate).format("YYYY-MM-DD"),
        note: res.data.note
    }
)
const EditAssignmentPage = () => {
    let history = useHistory();
    const {id} = useParams();
    const handleRedirectAssignmentPage = () => {
        history.push("/assignment");
    }
    const {
        data: users
    } = useFetch([], `${API_URL}/users`, convertDataResponse);
    const listUser = users.filter(u => u.username !== jwt_decode(localStorage.getItem("TOKEN")).sub);
    
    const {
        data: assets,
    } = useFetch([], `${API_URL}/assets`, convertDataResponse);
    const availableAssets = assets.filter(a => a.state === FILTER_STATE_OPTIONS.AVAILABLE);

    const {
        isLoading,
        data: assignments,
        errorMessage
    } = useFetch([], `${API_URL}/user/assignments/${id}`, convertDataAssignmentResponse);

    let assignedUser = users.find(u => u.username === assignments.assignTo);
    let assignedFullName = "";
    if (assignedUser !== undefined) {
        assignedFullName = assignedUser.firstName + " " + assignedUser.lastName;
    }

    const initialValues = {
        userFullName: assignedFullName,
        assignTo: assignments.assignTo,
        assetName: assignments.assetName,
        assetCode: assignments.assetCode,
        assignedDate: assignments.assignedDate,
        note: assignments.note
    }

    console.log("initial value = ", initialValues)
    const submit = (values, {resetForm}) => {
        // console.log('Form values =', {values});
        // console.log('token=',localStorage.getItem('TOKEN'));
        axios({
            method: 'PUT',
            url: `${API_URL}/admin/assignments/${id}`,
            header: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
            },
            data: {
                assetCode: values.assetCode,
                assignTo: values.assignTo,
                assignedDate: values.assignedDate,
                note: values.note
            }
        }).then((res) => {
            console.log("res = ", res);
            console.log("Edit success");
            history.push("/assignment", {firstId: res.data.id});
        }).catch(err => {
            console.log("err = ", err);
            return <div style={{color: "red"}}>{err}</div>;
        });
        resetForm();
    }

    if (isLoading) return "Loading...";
    if (errorMessage) return <div style={{color: "red"}}>{errorMessage}</div>;
    return (
        <div className="app-page">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Edit Assignment</div>
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
                                <Form.Group as={Row} className="mb-3" controlId="formTextFirstName">
                                    <Form.Label column sm="3">User</Form.Label>
                                    <Col sm="6">
                                        <Form.Select
                                            name="assignTo"
                                            value={values.assignTo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.assignTo && errors.assignTo}
                                        >
                                            {listUser.map(user => <option key={user.username}
                                                                       defaultChecked={values.assignTo === user.username}
                                                                       value={user.username}>{user.firstName + " " + user.lastName}</option>)}
                                        </Form.Select>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.assignTo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formTextFirstName">
                                    <Form.Label column sm="3">Asset</Form.Label>
                                    <Col sm="6">
                                        <Form.Select
                                            name="assetCode"
                                            value={values.assetCode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.assetCode && errors.assetCode}
                                        >
                                            {availableAssets.map(asset => <option key={asset.assetCode}
                                                                         defaultChecked={values.assetCode === asset.assetCode}
                                                                         value={asset.assetCode}>{asset.assetName}</option>)}
                                        </Form.Select>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.assetCode}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formTextInstallDate">
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
                                <Form.Group as={Row} className="mb-3" controlId="exampleFormControlTextarea">
                                    <Form.Label column sm="3">Note</Form.Label>
                                    <Col sm="6">
                                        <Form.Control rows={3}
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
                                            disabled={!values.assignTo || !values.assetCode || !values.assignedDate}
                                    >
                                        Save
                                    </Button>
                                    <Button className="btn-cancel" type="reset" onClick={handleRedirectAssignmentPage}>
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
export default EditAssignmentPage