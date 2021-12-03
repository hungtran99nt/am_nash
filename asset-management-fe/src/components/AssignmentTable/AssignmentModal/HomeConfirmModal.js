import React from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {API_URL, FILTER_ASM_STATE_OPTIONS} from "../../../common/constants";
import moment from "moment";
import {Redirect, useHistory} from "react-router-dom";
import './HomeConfirmModal.css';

const HomeConfirmModal =
    ({
         message, buttonName,
         handleCloseAcceptConfirm, handleCloseDeclineConfirm,
         showAcceptConfirm, showDeclineConfirm,
         assignments, assignmentID,
         setLoading
    }) => {

        const history = useHistory();

        const handleConfirmDecline = () => {
            axios
                .delete(`${API_URL}/user/assignment/${assignmentID}/decline`)
                .then(() => {
                    console.log(`Decline successful assignment: ${assignmentID}`);
                    handleCloseDeclineConfirm();
                    return <Redirect to="/" />;
                })
                .catch(err => {
                    handleCloseDeclineConfirm();
                    alert(`Decline error: ${err}`);
                });
        }
        console.log(assignments)
        const assignment = assignments.find( a => a.id === assignmentID);
        let formattedDate = moment(assignment.assignedDate).format("YYYY-MM-DD");
        console.log(formattedDate)
        const handleConfirmAccept = () => {
            axios({
                method: 'PUT',
                url: `${API_URL}/user/assignment/${assignmentID}/accept`,
                data: {
                    assetCode: assignment.assetCode,
                    assignBy: assignment.assignBy,
                    assignTo: assignment.assignTo,
                    assignedDate: formattedDate,
                    state: FILTER_ASM_STATE_OPTIONS.ACCEPTED,
                    note: assignment.note
                }
            }).then(() => {
                console.log(`Accept successful assignment: ${assignmentID}`);
                handleCloseAcceptConfirm();
                return <Redirect to="/" />;
            }).catch(err => {
                handleCloseAcceptConfirm();
                alert(`Accept error: ${err}`);
            });
            history.go();
        }

    return (
        <Modal
            show={buttonName==="Accept" ? showAcceptConfirm : showDeclineConfirm}
            onHide={buttonName==="Accept" ? handleCloseAcceptConfirm : handleCloseDeclineConfirm}
            centered
            backdrop="static"
            animation={true}
            size="sm"
            id="homeModal"
        >
            <Modal.Header
                closeButton=''
                className="text-danger"
                style={{backgroundColor: "#9fa2a34f", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}
            >
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer className="confirm">
                <Button
                    variant="danger"
                    onClick={buttonName==="Accept" ? handleConfirmAccept : handleConfirmDecline}
                    type="submit"
                >
                    {buttonName}
                </Button>
                <Button variant="outline-secondary" onClick={buttonName==="Accept" ? handleCloseAcceptConfirm : handleCloseDeclineConfirm}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default HomeConfirmModal;