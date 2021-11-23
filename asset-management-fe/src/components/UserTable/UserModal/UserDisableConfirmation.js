import { Modal } from "react-bootstrap";
import "./UserPopup.css";

const UserDisableConfirmation = ({ showConfirm, handleCloseConfirm }) => {
  return (
    <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
      <Modal.Header closeButton className="text-danger">
        <Modal.Title>Can not disable user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>There are valid assignment belonging to </p>
      </Modal.Body>
    </Modal>
  );
};

export default UserDisableConfirmation;
