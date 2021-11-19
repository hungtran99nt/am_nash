import BootstrapTable from 'react-bootstrap-table-next';
import {useEffect, useState} from "react";
import UserPopup from "./UserModal/UserPopup";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {API_URL} from "../../common/constants";
import axios from "axios";
import editImg from '../../assets/images/pen.png'
import deleteImg from '../../assets/images/cross.png'
import './UserTable.css'

const columnFormatter = (cell, row, rowIndex, formatExtraData) => {
	return (
		<div className="table__actions">
			<span className="action__items"><img src={editImg}/></span>
			<span className="action__items"><img src={deleteImg}/></span>
		</div>
	)
};

const columns = [
	{
		dataField: 'staffCode',
		text: 'Staff Code',
		sort: true
	}, {
		dataField: 'fullName',
		text: 'Full Name',
		sort: true
	}, {
		dataField: 'userName',
		text: 'Username',
		sort: true
	}, {
		dataField: 'joinDate',
		text: 'Join Date',
		sort: true
	}, {
		dataField: 'type',
		text: 'Type',
		sort: true
	}, {
		dataField: 'action',
		text: '',
		width: '50',
		formatter: columnFormatter,
		headerStyle: () => {
			return { width: '100px' };
		}
	}
];

const defaultSorted = [{
	dataField: 'staffCode',
	order: 'asc'
}]

//  config for pagination
const pagination = paginationFactory({
	page: 1,
	sizePerPage: 19,
	nextPageText: 'Next',
	prePageText: 'Prev',
	hideSizePerPage: true,
	withFirstAndLast: false,
	alwaysShowAllBtns: true,
});


const UserTable = ({users, isLoading}) => {
	const [userDetail, setUserDetail] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [userIdPopup, setUserIdPopup] = useState(1);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Get user detail for popup
	useEffect(() => {
		axios({
			method: 'GET',
			url: `${API_URL}/users/${userIdPopup}`
		}).then(res => {
			console.log(res.data)
			setUserDetail(res.data);
		}).catch(err => {
			console.log(err);
		})
	}, [userIdPopup])

	const getUserDetail = {
		onClick: (e, row) => {
			console.log(row)
			setUserIdPopup(row.id);
			toggleTrueFalse();
		},
	}

	const toggleTrueFalse = () => {
		setShowModal(handleShow);
	};

	if (isLoading) return (<div>Loading...</div>)
	return (
		<>
			<BootstrapTable
				keyField='id'
				data={users}
				columns={columns}
				hover
				rowEvents={getUserDetail}
				formatter={columnFormatter}
				defaultSorted={defaultSorted}
				pagination={pagination}
			/>
			{show ? <UserPopup show={show} handleClose={handleClose} userInfo={userDetail}/> : null}
		</>
	)
}

export default UserTable;
