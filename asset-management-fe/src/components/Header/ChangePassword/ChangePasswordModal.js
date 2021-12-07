import React, {useState} from 'react';
import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";
import * as Yup from 'yup';
import {useFormik} from 'formik';
import axios from "axios";
import {API_URL} from "../../../common/constants";
import {BsFillEyeSlashFill, BsFillEyeFill} from "react-icons/all";
import './ChangePasswordModal.css'

const Schema = Yup.object().shape({
    oldPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    confirmPassword: Yup.string()
        .required("Required")
        .when("newPassword", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("newPassword")],
                "Those passwords not match. Try again"
            )
        })
});

const ChangePasswordModal = ({show, handleClose}) => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }

    const submit = async (values, {setErrors}) => {
        await axios({
            method: 'PUT',
            url: `${API_URL}/users/user/changePassword`,
            data: {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }
        }).then(() => {
            setIsSubmitted(true);
        }).catch(() => {
            setErrors({oldPassword: "Password is incorrect"})
        });
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: submit,
        validationSchema: Schema,
    });

    const [isHided, setIsHided] = useState({
        oldPassword: true,
        newPassword: true,
        confirmPassword: true
    })

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            animation={true}
            size="md"
            id="homeModal"
        >
            <Modal.Header
                closeButton=''
                className="text-danger"
                style={{backgroundColor: "#9fa2a34f", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}
            >
                <Modal.Title>Change password</Modal.Title>
            </Modal.Header>

            {!isSubmitted &&
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">Old password</Form.Label>
                            <Col sm="6">
                                <InputGroup id="input-group-header">
                                    <Form.Control
                                        id="formPass"
                                        type={isHided.oldPassword ? "password" : "text"}
                                        name="oldPassword"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.oldPassword}
                                        isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
                                    />
                                    <Button variant="outline-secondary" id="eye-addon"
                                            onClick={() => {
                                                setIsHided(prevState => ({
                                                    ...prevState,
                                                    oldPassword: !isHided.oldPassword
                                                }));
                                            }}
                                    >
                                        {isHided.oldPassword ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.oldPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">New password</Form.Label>
                            <Col sm="6">
                                <InputGroup id="input-group-header">
                                    <Form.Control
                                        id="formPass"
                                        type={isHided.newPassword ? "password" : "text"}
                                        name="newPassword"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword}
                                        isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                                    />
                                    <Button variant="outline-secondary" id="eye-addon"
                                            onClick={() => {
                                                setIsHided(prevState => ({
                                                    ...prevState,
                                                    newPassword: !isHided.newPassword
                                                }));
                                            }}
                                    >
                                        {isHided.newPassword ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.newPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">Confirm password</Form.Label>
                            <Col sm="6">
                                <InputGroup id="input-group-header">
                                    <Form.Control
                                        id="formPass"
                                        type={isHided.confirmPassword ? "password" : "text"}
                                        name="confirmPassword"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                    <Button variant="outline-secondary" id="eye-addon"
                                            onClick={() => {
                                                setIsHided(prevState => ({
                                                    ...prevState,
                                                    confirmPassword: !isHided.confirmPassword
                                                }));
                                            }}
                                    >
                                        {isHided.confirmPassword ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <div className="col-sm-10 p-1 d-flex justify-content-end">
                            <Button type="submit" className="btn-primary"
                                    disabled={!formik.values.oldPassword || !formik.values.newPassword ||
                                        !formik.values.confirmPassword || formik.errors.confirmPassword}
                            >
                                Save
                            </Button>
                            <Button className="btn-cancel" type="reset"
                                    onClick={() => {
                                        formik.resetForm();
                                        handleClose();
                                    }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            }
            {isSubmitted &&
                <>
                    <Modal.Body>
                        Your password has been changed successfully!
                    </Modal.Body>
                    <Modal.Footer className="confirm">
                        <Button variant="outline-secondary" id="cancelPass"
                                onClick={() => {
                                    formik.resetForm();
                                    handleClose();
                                    setIsSubmitted(false);
                                }
                                }>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </>
            }
        </Modal>
    );
};

export default ChangePasswordModal;