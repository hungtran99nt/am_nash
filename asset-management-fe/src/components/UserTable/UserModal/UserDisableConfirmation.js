import { Modal, Button } from "react-bootstrap";
import "./UserPopup.css";

const UserDisableConfirmation = ({
  showConfirm,
  handleCloseConfirm,
  setDisableUser,
}) => {
  return (
    <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
      <Modal.Header closeButton className="text-danger">
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to disable this user? </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            setDisableUser(true);
            handleCloseConfirm(false);
          }}
          type="submit"
        >
          Disable
        </Button>
        <Button variant="outline-secondary" onClick={handleCloseConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDisableConfirmation;
