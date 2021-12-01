import { Modal, Button } from "react-bootstrap";
import "./AssignmentDeletePopup.css";
import axios from "axios";
import { API_URL } from "../../../common/constants";

const AssignmentDeleteConfirmation = ({
  idDelete,
  showDeleteConfirm,
  handleCloseDeleteConfirm,
  assignments
}) => {
  const updateDataState = () => {
		const index = assignments.map(x => {
			return x.id;
		}).indexOf(idDelete);
		assignments.splice(index, 1);
	}

  const handleConfirmDelete = () => {
		axios
			.delete(`${API_URL}/admin/assignments/${idDelete}`)
			.then(() => {
				console.log(`Delete successful assignment: ${idDelete}`);
				handleCloseDeleteConfirm();
			})
			.catch(err => {
				handleCloseDeleteConfirm();
				alert(`Delete error: ${err}`);
			});
		updateDataState();
	}
  return (
    <Modal 
            show={showDeleteConfirm} 
            onHide={handleCloseDeleteConfirm} 
            centered
            backdrop="static">
      <Modal.Header closeButton='' className="text-danger">
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete this assignment? </p>
      </Modal.Body>
      <Modal.Footer className="confirm">
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          type="submit"
        >
          Delete
        </Button>
        <Button variant="outline-secondary" onClick={handleCloseDeleteConfirm}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignmentDeleteConfirmation;
