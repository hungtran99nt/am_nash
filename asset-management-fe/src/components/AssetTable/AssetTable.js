import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {SORT_ORDERS} from "../../common/constants";
import editImg from "../../assets/images/pen.png";
import deleteImg from "../../assets/images/cross.png";
import BootstrapTable from "react-bootstrap-table-next";
import {pagination} from "../../common/config";
import AssetDetail from "./AssetModal/AssetDetail";

const defaultSorted = [{
	dataField: 'assetCode',
	order: SORT_ORDERS.ASC
}]

const AssetTable = ({assets, isLoading, errorMessage}) => {
	const history = useHistory();

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

	const sortAssetCode = (a, b, order) => {
		if (order === SORT_ORDERS.ASC)
			return a < b ? -1 : 1;
		return a > b ? -1 : 1;
	}

	const columns = [
		{
			dataField: 'assetCode',
			text: 'Asset Code',
			sort: true,
			sortFunc: (a, b, order) => {
				return sortAssetCode(a, b, order);
			}
		}, {
			dataField: 'assetName',
			text: 'Asset Name',
			sort: true
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

	const handleEditClicked = (id) => {
		history.push(`/edit/asset/${id}`);
	}

	const handleDeleteClicked = (id) => {
		console.log("Delete id = ", id)
	}

	const [assetIdPopup, setAssetIdPopup] = useState("");
	const [showDetail, setShowDetail] = useState(false);
	const handleCloseDetail = () => setShowDetail(false);
	const handleShowDetail = () => setShowDetail(true);

	const getAssetDetail = {
		onClick: (e, row) => {
			setAssetIdPopup(row.id);
			handleShowDetail();
		},
	}

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
			{showDetail ? <AssetDetail show={showDetail} handleClose={handleCloseDetail} assetId={assetIdPopup}/> : null}
		</>
	);
};

export default AssetTable;