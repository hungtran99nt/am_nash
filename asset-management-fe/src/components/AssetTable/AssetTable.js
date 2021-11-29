import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {API_URL, FILTER_STATE_OPTIONS, SORT_ORDERS} from "../../common/constants";
import editImg from "../../assets/images/pen.png";
import deleteImg from "../../assets/images/cross.png";
import BootstrapTable from "react-bootstrap-table-next";
import {pagination} from "../../common/config";
import axios from "axios";
import AssetDetail from "./AssetModal/AssetDetail";
import AssetDeleteNotification from "./AssetModal/AssetDeleteNotification";
import AssetDeleteConfirm from "./AssetModal/AssetDeleteConfirm";

const defaultSorted = [{
	dataField: 'assetCode',
	order: SORT_ORDERS.ASC
}]

const AssetTable = ({assets, isLoading, errorMessage, isRecentAsset}) => {
	const history = useHistory();

	const columnFormatter = (cell, row) => {
		return (
			<div className={`table__actions ${row.state === FILTER_STATE_OPTIONS.ASSIGNED ? 'disable' : ''}`}>
				<span
					className="action__items"
					title={`Edit asset ${row.assetName}`}
					onClick={row.state !== FILTER_STATE_OPTIONS.ASSIGNED ? () => handleEditClicked(row.id): undefined}
				>
					 <img src={editImg} alt="edit"/>
				</span>

				<span
					className="action__items"
					title={`Delete asset ${row.assetName}`}
					onClick={row.state !== FILTER_STATE_OPTIONS.ASSIGNED ? () => handleDeleteClicked(row.id): undefined}
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

	const [idDelete, setIdDelete] = useState(null);

	const [showNotification, setShowNotification] = useState(false);
	const handleCloseNotification = () => setShowNotification(false);
	const handleShowNotification = () => setShowNotification(true);

	const [showConfirm, setShowConfirm] = useState(false);
	const handleCloseConfirm = () => setShowConfirm(false);
	const handleShowConfirm = () => setShowConfirm(true);

	const handleDeleteClicked = (id) => {
		setIdDelete(id);
		axios
			.get(`${API_URL}/assets/${id}/valid`)
			.then(res => {
				if (res.data === true)
					handleShowConfirm();
				else handleShowNotification();
			})
			.catch(err => {
				alert(`Error with check valid to delete asset ${err}`);
			});
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
				defaultSorted={isRecentAsset ? [] : defaultSorted}
				pagination={pagination}
			/>
			{isLoading && <div>Loading...</div>}
			{errorMessage && <div>{errorMessage}</div>}

			{
				showDetail &&
				<AssetDetail
					show={showDetail}
					handleClose={handleCloseDetail}
					assetId={assetIdPopup}
				/>
			}

			{
				showNotification &&
				<AssetDeleteNotification
					show={showNotification}
					handleCloseNotification={handleCloseNotification}
					idDelete={idDelete}
				/>
			}

			{
				showConfirm &&
				<AssetDeleteConfirm
					show={showConfirm}
					assets={assets}
					handleCloseConfirm={handleCloseConfirm}
					idDelete={idDelete}
				/>
			}
		</>
	);
};

export default AssetTable;