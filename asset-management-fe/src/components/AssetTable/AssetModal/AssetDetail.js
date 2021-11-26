import {Modal} from "react-bootstrap";
import moment from "moment";
import {API_URL, DATE_FORMAT} from "../../../common/constants";
import useFetch from "../../../hooks/useFetch";

const convert = date => moment(date).format(DATE_FORMAT.TO);
const convertDataRes = res => res.data;

const AssetDetail = ({show, handleClose, assetId}) => {

	const {
		isLoading,
		data: asset,
		errorMessage,
	} =  useFetch({}, `${API_URL}/assets/${assetId}`, convertDataRes);

	if (errorMessage) return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className="text-danger">
				<Modal.Title>ERROR</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{errorMessage}</p>
			</Modal.Body>
		</Modal>
	)

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton className="text-danger">
				<Modal.Title>Detail Asset Information</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className='popup__detail'>
					<tbody>
					<tr>
						<th>Asset Code</th>
						{isLoading ? <td>Loading...</td> : <td>{asset.assetCode}</td>}
					</tr>
					<tr>
						<th>Asset Name</th>
						{isLoading ? <td>Loading...</td> : <td>{asset.assetName}</td>}
					</tr>
					<tr>
						<th>State</th>
						{isLoading ? <td>Loading...</td> : <td>{asset.state}</td>}
					</tr>
					<tr>
						<th>Category</th>
						{isLoading ? <td>Loading...</td> : <td>{asset.categoryName}</td>}
					</tr>
					<tr>
						<th>Location</th>
						{isLoading ? <td>Loading...</td> : <td>{asset.location}</td>}
					</tr>
					<tr>
						<th>Installed Date</th>
						{isLoading ? <td>Loading...</td> : <td>{convert(asset.installedDate)}</td>}
					</tr>
					<tr>
						<th>Specification</th>
						{isLoading ? <td>Loading...</td> : <td>{asset.specification}</td>}
					</tr>
					</tbody>
				</table>
			</Modal.Body>
		</Modal>
	);
}

export default AssetDetail;