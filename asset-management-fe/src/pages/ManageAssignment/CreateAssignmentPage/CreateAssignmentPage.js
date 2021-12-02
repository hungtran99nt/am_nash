import React, {useState} from "react";
import './CreateAssignmentPage.css'
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';
import useFetch from "../../../hooks/useFetch";
import {API_URL, DATE_FORMAT, FILTER_ASM_STATE_OPTIONS, TODAY} from "../../../common/constants";

import moment from "moment";
import {InputGroup} from "reactstrap";
import UserAssignmentModal from "../AssignmentModal/UserAssignmentModal";
import AssetAssignmentModal from "../AssignmentModal/AssetAssignmentModal";
import axios from "axios";
import {BiSearchAlt} from "react-icons/all";

const validateForm = Yup.object().shape({
    user: Yup.string().required("Required!"),
    asset: Yup.string().required("Required!"),
    note: Yup.string().required("Required!"),
    assignedDate: Yup
        .date()
        .required("Required!")
        .min(TODAY, "Date cannot be in the past")
})
const convertUserResponse = res => res.data.map(u => (
    {
        id: u.id,
        staffCode: u.staffCode,
        fullName: `${u.lastName} ${u.firstName}`,
        userName: u.username,
        joinedDate: moment(u.joinedDate).format(DATE_FORMAT.TO),
        type: u.type,
        location: u.location
    }
));
const convertAssetResponse = res => res.data;
const CreateAssignmentPage = () => {
    let history = useHistory();

    let curDate = moment(Date.now()).format("YYYY-MM-DD");

    /**
     * Fetch user and asset
     */
    const {
        isUserLoading,
        data: users,
        errorUserMessage
    } = useFetch([], `${API_URL}/users`, convertUserResponse);
    const {
        isAssetLoading,
        data: assets,
        errorAssetMessage
    } = useFetch([], `${API_URL}/assets`, convertAssetResponse);
    console.log(assets)
    if (errorUserMessage && errorAssetMessage) window.location.reload(history.push("/login"));

    const submit = (values, {resetForm}) => {
        axios({
            method: 'POST',
            url: `${API_URL}/admin/assignments/`,
            data: {
                assetCode: assignedAsset.assetCode,
                assignBy: localStorage.getItem('USERNAME'),
                assignTo: assignedTo.userName,
                assignedDate: values.assignedDate,
                state: FILTER_ASM_STATE_OPTIONS.WAITING_FOR_ACCEPTANCE,
                note: values.note
            }
        }).then(res => {
            history.push("/assignment")
        }).catch(err => {
            console.log("err = ", err);
        }).finally( () => {
                resetForm();
                setAssignedAsset("");
                setAssignedTo("");
            }
        );
    }
    const handleRedirectAssignmentManagePage = () => {
        history.push("/assignment")
    }

    /**
     * Popup handle go here
     */
    const [show, setShow] = useState(false);
    const handleClickUserPopup = () => setShow(true);
    const handleClose = () => setShow(false);

    const [showAsset, setShowAsset] = useState(false);
    const handleClickAssetPopup = () => setShowAsset(true);
    const handleAssetClose = () => setShowAsset(false);
    /**
     * Pass users from popup to input form
     */
    const [assignedTo, setAssignedTo] = useState({});
    const handlePassingData = (user) => setAssignedTo(user);
    console.log(assignedTo.fullName)
    const [assignedAsset, setAssignedAsset] = useState({});
    const handlePassingAsset = (asset) => setAssignedAsset(asset);
    console.log(assignedAsset)

    let assignedFullName = "";
    if (assignedTo.fullName !== undefined) {
        assignedFullName = assignedTo.fullName
    }
    let assignedAssetName = "";
    if (assignedAsset.assetName !== undefined){
        assignedAssetName = assignedAsset.assetName;
    }
    const initialValues = {
        user: assignedFullName,
        asset: assignedAssetName,
        note: "",
        assignedDate: curDate
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
                                        <InputGroup>
                                            <Form.Control
                                                type="text" name="user"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.user}
                                                isInvalid={touched.user && errors.user}
                                                disabled={true}
                                            />
                                            <Button variant="outline-secondary" id="button-addon1"
                                                    onClick={handleClickUserPopup}
                                            >
                                               <BiSearchAlt/>
                                            </Button>
                                            <UserAssignmentModal
                                                show={show} handleClose={handleClose} users={users} handlePassingData={handlePassingData}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.user}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formTextAssetName">
                                    <Form.Label column sm="3">Asset</Form.Label>
                                    <Col sm="6">
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                name="asset"
                                                value={values.asset}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.asset && errors.asset}
                                                disabled={true}
                                            />
                                            <Button variant="outline-secondary" id="button-addon2"
                                                    onClick={handleClickAssetPopup}
                                            >
                                                <BiSearchAlt/>
                                            </Button>
                                            <AssetAssignmentModal
                                                show={showAsset} handleClose={handleAssetClose} assets={assets} handlePassingData={handlePassingAsset}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.asset}
                                            </Form.Control.Feedback>
                                        </InputGroup>
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
                                    <Button className="btn-cancel" type="reset"
                                            onClick={handleRedirectAssignmentManagePage}>
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
