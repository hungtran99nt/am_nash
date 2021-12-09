import './CreateAssetPage.css'
import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';
import {FiChevronDown} from "react-icons/all";
import {InputGroup} from "reactstrap";
import CategoryModal from "./CategoryModal/CategoryModal";
import axios from "axios";
import {API_URL} from "../../../common/constants";
import Error from "../../Error/Error";


const validateForm = Yup.object().shape({
    assetName: Yup.string().required("Required!"),
    categoryName: Yup.string().required("Required!"),
    specification: Yup.string().required("Required!"),
    installedDate: Yup.date().required("Required!"),
})

const CreateAssetPage = () => {
    let history = useHistory();

    const handleRedirectAssetManagePage = () => {
        history.push("/asset")
    }

    const [show, setShow] = useState(false);
    const handleClickCategoryPopup = () => setShow(true);
    const handleClose = () => setShow(false);
    // const [category, setCategory] = useState({});
    // console.log("before send data ", category)
    // const handlePassingData = (cate) => setCategory(cate);
    // console.log("after send data = ", category)

    const initialValues = {
        assetName: "",
        categoryName: "",
        specification: "",
        installedDate: "",
        state: "Available"
    }

    const submit = (values, {resetForm}) => {
        console.log("value on submit =", values);
        axios({
            method: 'POST',
            url: `${API_URL}/assets/`,
            data: {
                assetName: values.assetName,
                categoryName: values.categoryName,
                specification: values.specification,
                installedDate: values.installedDate,
                state: values.state
            }
        }).then(res => {
            // console.log("res = ", res);
            console.log('create asset success.');
            history.push("/asset", {firstId: res.data.id});
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
                    <div className="app-content__title">Create New Asset</div>
                    <Formik
                        enableReinitialize={false}
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
                              setFieldValue,
                              handleSubmit
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                {/*Asset name*/}
                                <Form.Group as={Row} className="mb-3" controlId="formTextFirstName">
                                    <Form.Label column sm="3">Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="assetName"
                                            value={values.assetName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.assetName && errors.assetName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.assetName}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                {/*Category*/}
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm="3">Category</Form.Label>
                                    <Col sm="6">
                                        <InputGroup>
                                            <Form.Control
                                                className="input-category"
                                                name="categoryName"
                                                onClick={handleClickCategoryPopup}
                                                onChange={handleChange}
                                                value={values.categoryName}
                                                onBlur={handleBlur}
                                                readOnly
                                                // disabled
                                                isInvalid={touched.categoryName && errors.categoryName}
                                                placeholder="Select category"
                                            />
                                            <Button className="btn-modal"
                                                    onClick={handleClickCategoryPopup}
                                            >
                                                <FiChevronDown/>
                                            </Button>
                                            <CategoryModal
                                                show={show}
                                                handleClose={handleClose}
                                                setFieldValue={setFieldValue}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.categoryName}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Form.Group>
                                {/*Specification*/}
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
                                {/*Installed Date<*/}
                                <Form.Group as={Row} className="mb-3" controlId="formTextInstallDate">
                                    <Form.Label column sm="3">Installed Date</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="installedDate"
                                            type="date"
                                            value={values.installedDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.installedDate && errors.installedDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.installedDate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                {/*State*/}
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">State</Form.Label>
                                    <Col sm="6">
                                        <div className="mb-3">
                                            <Form.Check
                                                label="Available"
                                                name="state"
                                                type="radio"
                                                value="Available"
                                                defaultChecked={true}
                                                onChange={handleChange}
                                            />
                                            <Form.Check
                                                label="Not Available"
                                                name="state"
                                                type="radio"
                                                value="Not Available"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                                <div className="group-btn">
                                    <Button type="submit" className="btn-primary"
                                            disabled={!values.assetName || !values.specification || !values.installedDate || !values.categoryName}
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
export default CreateAssetPage
