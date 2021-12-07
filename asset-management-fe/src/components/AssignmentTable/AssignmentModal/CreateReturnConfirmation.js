import React from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import {API_URL, FILTER_ASM_STATE_OPTIONS} from "../../../common/constants";

const CreateReturnConfirmation = ({currentRowSelected, showReturnConfirm, handleCloseReturnConfirm}) => {
    const updateAssignmentState = () => {
        currentRowSelected.state = FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING;
    }

    const handleConfirmReturn = () => {
        axios
            .put(`${API_URL}/user/assignments/${currentRowSelected.id}/return`)
            .then(() => {
                // console.log(`Create return request successfully: ${currentRowSelected.id}`);
                updateAssignmentState();
            })
            .catch(err => {
                // console.log(`Create return request failed: ${currentRowSelected.id}`);
                // console.log(err);
                // console.log(err.response.data);
            })
            .finally(() => {
                handleCloseReturnConfirm();
            });
        // console.log(`Create return request successfully: ${currentRowSelected.id}`);
    }

    return (
        <Modal
            show={showReturnConfirm}
            onHide={handleCloseReturnConfirm}
            centered
            backdrop="static">
            <Modal.Header closeButton='' className="text-danger">
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want to create return request for this asset?</p>
            </Modal.Body>
            <Modal.Footer className="confirm">
                <Button
                    variant="danger"
                    onClick={handleConfirmReturn}
                    type="submit"
                >
                    Yes
                </Button>
                <Button variant="outline-secondary" onClick={handleCloseReturnConfirm}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateReturnConfirmation;
