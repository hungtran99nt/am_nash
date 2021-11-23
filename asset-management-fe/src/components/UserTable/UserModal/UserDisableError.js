import { Modal } from "react-bootstrap";
import "./UserPopup.css";

const UserDisableError = ({ showErr, handleCloseErr }) => {
  console.log("error:", showErr);
  return (
    <Modal onHide={handleCloseErr} centered>
      <Modal.Header closeButton className="text-danger">
        <Modal.Title>Can not disable user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>There are valid assignment belonging to </p>
      </Modal.Body>
    </Modal>
  );
};

export default UserDisableError;
