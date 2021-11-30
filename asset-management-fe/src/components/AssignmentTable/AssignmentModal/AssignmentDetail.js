import React from 'react';
import useFetch from "../../../hooks/useFetch";
import {API_URL, DATE_FORMAT} from "../../../common/constants";
import moment from "moment";
import {Modal} from "react-bootstrap";


const convert = date => moment(date).format(DATE_FORMAT.TO);
const convertDataRes = res => res.data;

const AssignmentDetail = ({show, handleClose, assignmentId}) => {
	const {
		isLoading,
		data: assignment,
		errorMessage
	} =  useFetch({}, `${API_URL}/assignments/${assignmentId}`, convertDataRes);

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className="text-danger">
				<Modal.Title>Detail Assignment Information</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorMessage && <p>{errorMessage}</p>}
				{assignment &&
				<table className='popup__detail'>
					<tbody>
					<tr>
						<th>ID</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.id}</td>}
					</tr>
					<tr>
						<th>Asset Code</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.assetCode}</td>}
					</tr>
					<tr>
						<th>Asset Name</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.assetName}</td>}
					</tr>
					<tr>
						<th>State</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.state}</td>}
					</tr>
					<tr>
						<th>Assign By</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.assignBy}</td>}
					</tr>
					<tr>
						<th>Assign To</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.assignTo}</td>}
					</tr>
					<tr>
						<th>Assigned Date</th>
						{isLoading ? <td>Loading...</td> : <td>{convert(assignment.assignedDate)}</td>}
					</tr>
					<tr>
						<th>Note</th>
						{isLoading ? <td>Loading...</td> : <td>{assignment.note}</td>}
					</tr>
					</tbody>
				</table>}
			</Modal.Body>
		</Modal>
	);
};

export default AssignmentDetail;