import React from 'react';
import {useHistory} from "react-router-dom";
import {SORT_ORDERS} from "../../common/constants";
import editImg from "../../assets/images/pen.png";
import deleteImg from "../../assets/images/cross.png";
import BootstrapTable from "react-bootstrap-table-next";
import {pagination, sortCode} from "../../common/config";

const defaultSorted = [{
	dataField: 'assetCode',
	order: SORT_ORDERS.ASC
}]

const AssetTable = ({assets, isLoading, errorMessage}) => {
	const history = useHistory();

	const handleEditClicked = (id) => {
		history.push(`/edit/asset/${id}`);
	}

	const handleDeleteClicked = (id) => {
		console.log("Delete id = ", id)
	}

	const columnFormatter = (cell, row) => {
		return (
			<div className="table__actions">
				<span
					className="action__items"
					title={`Edit asset ${row.assetName}`}
					onClick={() => handleEditClicked(row.id)}
				>
					 <img src={editImg} alt="edit"/>
				</span>

				<span
					className="action__items"
					title={`Delete asset ${row.assetName}`}
					onClick={() => handleDeleteClicked(row.id)}
				>
					 <img src={deleteImg} alt="delete"/>
				</span>
			</div>
		)
	};

	const getAssetDetail = {
		onClick: (e, row) => {
			console.log("row id = ", row.id);
		},
	}

	const columns = [
		{
			dataField: 'assetCode',
			text: 'Asset Code',
			sort: true,
			sortFunc: (a, b, order) => {
				return sortCode(a, b, order);
			}
		}, {
			dataField: 'categoryName',
			text: 'Category Name',
			sort: true
		}, {
			dataField: 'state',
			text: 'State',
			sort: true
		}, {
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
				return {width: '100px'};
			}
		}
	];

	return (
		<>
			<BootstrapTable
				hover
				keyField='id'
				data={assets}
				columns={columns}
				rowEvents={getAssetDetail}
				formatter={columnFormatter}
				defaultSorted={defaultSorted}
				pagination={pagination}
			/>
			{isLoading && <div>Loading...</div>}
			{errorMessage && <div>{errorMessage}</div>}
			{/*{show ? <UserPopup show={show} handleClose={handleClose} userInfo={userDetail}/> : null}*/}
		</>
	);
};

export default AssetTable;