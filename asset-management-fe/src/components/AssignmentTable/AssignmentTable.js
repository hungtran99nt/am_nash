import React, {useState} from 'react';
import editImg from "../../assets/images/pen.png";
import deleteImg from "../../assets/images/cross.png";
import returnImg from "../../assets/images/return.png";
import BootstrapTable from "react-bootstrap-table-next";
import {pagination} from "../../common/config";
import {FILTER_ASM_STATE_OPTIONS, SORT_ORDERS, FILTER_ASM_STATE_DELETE} from "../../common/constants";
import {useHistory} from "react-router-dom";
import NoDataFound from "../NoDataFound/NoDataFound";
import './AssignmentTable.css';
import AssignmentDetail from "./AssignmentModal/AssignmentDetail";
import axios from 'axios';
import { API_URL } from "../../common/constants";
import AssignmentDeleteConfirmation from './AssignmentModal/AssignmentDeleteConfirmation'

const defaultSorted = [{
	dataField: 'assetCode',
	order: SORT_ORDERS.ASC
}]

const AssignmentTable = ({isLoading, errorMessage, assignments}) => {
	const history = useHistory();

	const columnNoFormatter = (cell, row, index) => {
		return <span>{index + 1}</span>;
	}

	const columnFormatter = (cell, row) => {
		return (
			<div className={`table__actions ${row.state === FILTER_ASM_STATE_DELETE.WAITING_FOR_RETURNING || row.state === FILTER_ASM_STATE_DELETE.ACCEPTED ? 'disable' : ''}`}>
				<span
					className="action__items"
					onClick={
						row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED ?
							() => handleEditClicked(row.id) : undefined
					}
					title={"Edit assignment"}
				>
					 <img src={editImg} alt="edit"/>
				</span>

				<span
					className="action__items"
					onClick={
						row.state !== FILTER_ASM_STATE_DELETE.ACCEPTED && row.state !== FILTER_ASM_STATE_DELETE.WAITING_FOR_RETURNING ?
							() => handleDeleteClicked(row.id)
							: undefined
					}
					title={"Delete assignment"}
				>
					 <img src={deleteImg} alt="delete"/>
				</span>
				<span
					className="action__items"
					onClick={
						row.state !== FILTER_ASM_STATE_OPTIONS.ACCEPTED ?
							() => console.log(`Return assignment id: ${row.id}`) : undefined
					}
					title={"Return assignment"}
				>
					 <img src={returnImg} alt="return"/>
				</span>
			</div>
		)
	};

	const columns = [
		{
			dataField: 'id',
			text: 'No.',
			sort: true,
			formatter: columnNoFormatter,
			headerStyle: () => {
				return {width: '70px'};
			}
		},
		{
			dataField: 'assetCode',
			text: 'Asset Code',
			sort: true,
			headerStyle: () => {
				return {width: '120px'};
			}
		}, {
			dataField: 'assetName',
			text: 'Asset Name',
			sort: true,
		}, {
			dataField: 'assignTo',
			text: 'Assign to',
			sort: true,
			headerStyle: () => {
				return {width: '110px'};
			}
		}, {
			dataField: 'assignBy',
			text: 'Assign by',
			sort: true,
			headerStyle: () => {
				return {width: '110px'};
			}
		},
		{
			dataField: 'assignedDate',
			text: 'Assign Date',
			sort: true,
			headerStyle: () => {
				return {width: '130px'};
			}
		}, {
			dataField: 'state',
			text: 'State',
			sort: true,
			headerStyle: () => {
				return {width: '190px'};
			}
		},
		{
			dataField: 'action',
			text: '',
			width: '50',
			events: {
				onClick: (e) => {
					e.stopPropagation();
				}
			},
			formatter: columnFormatter,
			headerStyle: () => {
				return {width: '95px'};
			}
		}
	];

	const handleEditClicked = (id) => {
		history.push(`edit/assignment/${id}`)
	}
	const handleDeleteClicked = (id) => {
		setIdDelete(id);
		axios.get(`${API_URL}/admin/assignments/${id}/valid`).then((response) => {
			if (response.data === true) {
				handleShowDeleteConfirm();
			}
			
		}).catch(err => {alert(`Error with check valid to delete asset ${err}`)})
	}

	const [assignmentIdPopup, setAssignmentIdPopup] = useState("");
	const [showDetail, setShowDetail] = useState(false);
	const handleCloseDetail = () => setShowDetail(false);
	const handleShowDetail = () => setShowDetail(true);

	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [idDelete, setIdDelete] = useState(null);
	const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
	const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);

	const getAssignmentDetail = {
		onClick: (e, row) => {
			setAssignmentIdPopup(row.id);
			handleShowDetail();
		}
	}

	return (
		<>
			<BootstrapTable
				hover
				keyField='id'
				columns={columns}
				data={assignments}
				rowEvents={getAssignmentDetail}
				formatter={columnFormatter}
				defaultSorted={defaultSorted}
				pagination={pagination}
			/>
			{isLoading && <div>Loading...</div>}
			{errorMessage && <div>{errorMessage}</div>}
			{!errorMessage && !isLoading && assignments.length === 0 && <NoDataFound/>}

			{
				showDetail &&
				<AssignmentDetail
					show={showDetail}
					handleClose={handleCloseDetail}
					assignmentId={assignmentIdPopup}
				/>
			}
			{
				showDeleteConfirm &&
				<AssignmentDeleteConfirmation
					showDeleteConfirm={showDeleteConfirm}
					handleCloseDeleteConfirm={handleCloseDeleteConfirm}
					assignments={assignments}
					idDelete={idDelete}
				/>
			}
		</>
	);
};

export default AssignmentTable;