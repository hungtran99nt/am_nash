import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';


const validateForm = Yup.object().shape({
    name:Yup.string().required("Required!"),
    category:Yup.string().required("Required!"),
    specification:Yup.string().required("Required!"),
    installDate:Yup.date().required("Required!"),
})
const EditAssetPage = () =>{
    let history = useHistory();
    const handleRedirectAssetManagePage = () =>{
        history.push("/asset")
    }
    const initialValues ={
        name:"",
        category:"Laptop",
        specification:"",
        installDate:"",
        state:"Recycled"
    }
    const submit = (values,{resetForm}) => {
        console.log("value on submit =",values);
        history.push("/asset")
        resetForm();
    }
    return(
        <div className="app-page">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Edit Asset</div>
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
                                    <Form.Label column sm="3">Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            defaultValue={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.name && errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">Category</Form.Label>
                                    <Col sm="6">
                                        <Form.Select
                                            name="type"
                                            value={values.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.category && errors.category}
                                            disabled={true}
                                        >
                                            <option value={values.category}/>
                                            {/*<option value="Staff" defaultChecked={values.type === "Staff"}*/}
                                            {/*        label="Staff"/>*/}
                                            {/*<option value="Admin" defaultChecked={values.type === "Admin"}*/}
                                            {/*        label="Admin"/>*/}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="exampleFormControlTextarea">
                                    <Form.Label column sm="3">Specification</Form.Label>
                                    <Col sm="6">
                                        <Form.Control rows={4}
                                            as="textarea"
                                            name="specification"
                                            value={values.specification}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.specification && errors.specification}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.specification}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextInstallDate">
                                    <Form.Label column sm="3">Installed Date</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="birthDate"
                                            type="date"
                                            value={values.installDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.installDate && errors.installDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.installDate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">State</Form.Label>
                                    <Col sm="6">
                                        <div className="mb-3">
                                            <Form.Check
                                                label="Available"
                                                name="state"
                                                type="radio"
                                                value="Available"
                                                checked={values.state === "Available"}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                label="Not Available"
                                                name="state"
                                                type="radio"
                                                value="Not Available"
                                                checked={values.state === "Not Available"}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                label="Waiting for recycling"
                                                name="state"
                                                type="radio"
                                                value="Waiting for recycling"
                                                checked={values.state === "Waiting for recycling"}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                label="Recycled"
                                                name="state"
                                                type="radio"
                                                value="Recycled"
                                                checked={values.state === "Recycled"}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>


                                <div className="group-btn">
                                    <Button type="submit" className="btn-primary"
                                            disabled={!values.name || !values.specification ||!values.installDate}
                                    >
                                        Save
                                    </Button>
                                    <Button className="btn-cancel" type="reset" onClick={handleRedirectAssetManagePage}>
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
export default EditAssetPage
