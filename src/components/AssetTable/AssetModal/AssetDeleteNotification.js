import React from 'react';
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const AssetDeleteNotification = ({show, handleCloseNotification, idDelete}) => {
	return (
		<Modal show={show} onHide={handleCloseNotification} centered>
			<Modal.Header closeButton className="text-danger">
				<Modal.Title>Cannot Delete Asset</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Cannot delete the asset because it belongs to one or more historical assignments.
				</p>
				<p>
					If the asset is not able to be used anymore,
					please update its state in <Link to={`/edit/asset/${idDelete}`}> Edit Asset page </Link>
				</p>
			</Modal.Body>
		</Modal>
	);
};

export default AssetDeleteNotification;