import { Modal } from "react-bootstrap";
import "./UserPopup.css";

const UserDisableError = ({ showErr, handleCloseErr }) => {
  return (
    <Modal show={showErr} onHide={handleCloseErr} centered backdrop="static">
      <Modal.Header closeButton className="text-danger">
        <Modal.Title>Can not disable user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          There are valid assignment belonging to this user.
          <br />
          Please close all assignments before disabling user.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default UserDisableError;
