import {useHistory} from "react-router-dom";
import {Formik} from "formik";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import * as Yup from "yup";

const validateForm = Yup.object().shape({
    user:Yup.string().required("Required!"),
    asset:Yup.string().required("Required!"),
    assignedDate:Yup.date().required("Required!"),
})
const EditAssignmentPage = () =>{
    let history = useHistory();
    const handleRedirectAssignmentPage = () =>{
        history.push("/assignment");
    }
    const initialValues ={
        user:"",
        asset:"",
        assignedDate:"",
        note:""
    }
    const submit = (values,{resetForm}) => {
        console.log("value on submit =",values);
        history.push("/assignment")
        resetForm();
    }
    return(
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
                                <Form.Group as={Row} className="mb-3" controlId="formTextFirstName">
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
                                <Form.Control.Feedback type="invalid">
                                    {errors.asset}
                                </Form.Control.Feedback>
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
                                            disabled={!values.user || !values.asset ||!values.assignedDate}
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