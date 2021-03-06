import {Modal} from "react-bootstrap";
import './UserPopup.css'
import moment from "moment";
import {DATE_FORMAT} from "../../../common/constants";

const convert = date => moment(date).format(DATE_FORMAT.TO);

const UserPopup = ({show, handleClose, userInfo}) => {

	return (
		<Modal className="userModal" show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className="text-danger">
				<Modal.Title>Detail User Information</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className='popup__detail'>
					<tbody>
					<tr>
						<th>Staff Code</th>
						<td>{userInfo.staffCode}</td>
					</tr>
					<tr>
						<th>Full Name</th>
						<td>{userInfo.firstName} {userInfo.lastName}</td>
					</tr>
					<tr>
						<th>UserName</th>
						<td>{userInfo.username}</td>
					</tr>
					<tr>
						<th>Date of Birth</th>
						<td>{convert(userInfo.birthDate)}</td>
					</tr>
					<tr>
						<th>Gender</th>
						<td>{userInfo.gender}</td>
					</tr>
					<tr>
						<th>Type</th>
						<td>{userInfo.type}</td>
					</tr>
					<tr>
						<th>Location</th>
						<td>{userInfo.location}</td>
					</tr>
					</tbody>
				</table>
			</Modal.Body>
		</Modal>
	);
}

export default UserPopup