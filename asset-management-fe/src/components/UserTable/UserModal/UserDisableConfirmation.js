import { Modal, Button } from "react-bootstrap";
import "./UserPopup.css";
import axios from "axios";
import { API_URL } from "../../../common/constants";

const UserDisableConfirmation = ({
  idDisable,
  showConfirm,
  handleCloseConfirm,
}) => {
  return (
    <Modal show={showConfirm} onHide={handleCloseConfirm} centered backdrop="static">
      <Modal.Header closeButton='' className="text-danger">
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to disable this user? </p>
      </Modal.Body>
      <Modal.Footer className="confirm">
        <Button
          variant="danger"
          onClick={() => {
            axios.put(`${API_URL}/users/disable/${idDisable}`);
            handleCloseConfirm(false);
          }}
          type="submit"
        >
          Disable
        </Button>
        <Button variant="outline-secondary" onClick={handleCloseConfirm}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDisableConfirmation;
