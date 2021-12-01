import React, {useState} from "react";
import './CreateAssetPage.css'
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';
import useFetch from "../../../hooks/useFetch";
import {API_URL} from "../../../common/constants";
import {BsPlus, FiChevronDown} from "react-icons/all";


const validateForm = Yup.object().shape({
    name: Yup.string().required("Required!"),
    category: Yup.string().nullable().required("Required!"),
    specification: Yup.string().required("Required!"),
    installDate: Yup.date().required("Required!"),
})
const convertDataResponse = res => res.data;

const CreateAssetPage = () => {
    let history = useHistory();

    const {
        data: categories,
    } = useFetch([], `${API_URL}/categories`, convertDataResponse);
    const handleRedirectAssetManagePage = () => {
        history.push("/asset")
    }
    const initialValues = {
        name: "",
        category: "",
        specification: "",
        installDate: "",
        state: ""
    }
    const [dropValue, setDropValue] = useState("Select Category")


    const submit = (values, {resetForm}) => {
        console.log("value on submit =", values);
        history.push("/asset")
        resetForm();
    }
    return (
        <div className="app-page">
            <div className="row">
                <div className="col-lg-2"/>
                <div className="col-lg-8">
                    <div className="app-content__title">Create New Asset</div>
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
                                        <Dropdown
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <Dropdown.Toggle id="dropdown-autoclose-true"
                                                             className="form-control drop-category"
                                                             placeholder={dropValue}
                                            >
                                                <div className="drop-box">
                                                    <span className="drop-title">{dropValue}</span>
                                                    <FiChevronDown/>
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="form-control">
                                                {categories.map(cate => <Dropdown.Item key={cate.id}
                                                                                       value={values.category}>
                                                    <div
                                                        onClick={(e) => setDropValue(e.target.textContent)}>{cate.categoryName}
                                                    </div>
                                                </Dropdown.Item>)
                                                }
                                                <Dropdown.Divider/>
                                                <div className="category-form">
                                                    <input placeholder="Name of new Category" className="input-cate"/>
                                                    <input placeholder="Prefix of new Category"
                                                           className="input-prefix"/>
                                                    <button className="btn btn-addCategory"><BsPlus/> Add Category
                                                    </button>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>

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
                                            name="installDate"
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
                                            disabled={!values.name || !values.specification || !values.installDate}
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
