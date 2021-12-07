import React from 'react';
import {DATE_FORMAT, FILTER_ASM_STATE_OPTIONS, FILTER_STATE_OPTIONS, SORT_ORDERS} from "../../common/constants";
import BootstrapTable from "react-bootstrap-table-next";
import {pagination} from "../../common/config";
import NoDataFound from "../NoDataFound/NoDataFound";
import {BsCheckLg, FaTimes} from "react-icons/all";
import moment from "moment";

const defaultSorted = [{
	dataField: 'assetCode',
	order: SORT_ORDERS.ASC
}]

const RequestTable = ({requests, isLoading, errorMessage}) => {

	const handleCompleteClicked = id => {
		console.log(`Complete ${id}`);
	}

	const handleCancelClicked = id => {
		console.log(`Cancel ${id}`);
	}

	const columnNoFormatter = (cell, row, index) => {
		return <span>{index + 1}</span>;
	}

	const columnFormatter = (cell, row) => {
		return (<div className={`table__actions ${row.state === FILTER_STATE_OPTIONS.WAITING_FOR_RECYCLING ? 'disable' : ''}`}>
			{/* Complete button */}
			<BsCheckLg
				color={'#6F6F6F'}
				className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING ? '' : 'disable'}`}
				title="Complete request"
				onClick={row.state !== FILTER_ASM_STATE_OPTIONS.COMPLETED ? () => handleCompleteClicked(row.id) : undefined}
			/>

			{/* Cancel button */}
			<FaTimes
				color={'#D85667'}
				className={`action__items ${row.state === FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING ? '' : 'disable'}`}
				title="Cancel request"
				onClick={row.state !== FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING ? () => handleCancelClicked(row.id) : undefined}
			/>
		</div>)
	};

	const columns = [
		{
			dataField: 'id',
			text: 'No.',
			sort: true,
			formatter: columnNoFormatter,
			headerStyle: () => {
				return {width: '50px'};
			}
		},
		{
			dataField: 'assetCode',
			text: 'Asset Code',
			sort: true,
			headerStyle: () => {
				return {width: '90px'};
			}
		},
		{
			dataField: 'assetName',
			text: 'Asset Name',
			sort: true,
			headerStyle: () => {
				return {width: '120px'};
			}
		},
		{
			dataField: 'requestedBy',
			text: 'Requested By',
			sort: true,
			headerStyle: () => {
				return {width: '110px'};
			}
		},
		{
			dataField: 'assignedDate',
			text: 'Assigned Date',
			sort: true,
			sortFunc: (a, b, order) => {
				if (order === SORT_ORDERS.ASC)
					return moment(a, DATE_FORMAT.TO) - moment(b, DATE_FORMAT.TO);
				return moment(b, DATE_FORMAT.TO) - moment(a, DATE_FORMAT.TO);
			},
			headerStyle: () => {
				return {width: '110px'};
			}
		},
		{
			dataField: 'acceptedBy',
			text: 'Accepted by',
			sort: true,
			headerStyle: () => {
				return {width: '100px'};
			}
		},
		{
			dataField: 'returnedDate',
			text: 'Returned Date',
			sort: true,
			sortFunc: (a, b, order) => {
				if (order === SORT_ORDERS.ASC)
					return moment(a, DATE_FORMAT.TO) - moment(b, DATE_FORMAT.TO);
				return moment(b, DATE_FORMAT.TO) - moment(a, DATE_FORMAT.TO);
			},
			headerStyle: () => {
				return {width: '110px'};
			}
		},
		{
			dataField: 'state',
			text: 'State',
			sort: true,
			headerStyle: () => {
				return {width: '120px'};
			}
		},
		{
			dataField: 'action',
			text: '',
			events: {
				onClick: (e) => {
					e.stopPropagation();
				}
			},
			formatter: columnFormatter,
			headerStyle: () => {
				return {width: '50px'};
			}
		}
	];

	return (<>
		<BootstrapTable
			hover
			keyField='id'
			columns={columns}
			data={requests}
			formatter={columnFormatter}
			pagination={pagination}
			defaultSorted={defaultSorted}
		/>
		{isLoading && <div>Loading...</div>}
		{errorMessage && <div>{errorMessage}</div>}
		{!errorMessage && !isLoading && requests.length === 0 && <NoDataFound/>}
	</>);
};

export default RequestTable;