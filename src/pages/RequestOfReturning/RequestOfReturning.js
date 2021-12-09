import React, {useMemo, useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {API_URL, DATE_FORMAT, FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import RequestTable from "../../components/RequestTable/RequestTable";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import {isMatchExact} from "../../common/config";

const convertDataResponse = res => res.data.map(a => (
	{
		id: a.id,
		assetCode: a.assetCode,
		assetName: a.assetName,
		requestedBy: a.requestBy,
		assignedDate: moment(a.assignedDate).format(DATE_FORMAT.TO),
		acceptedBy: a.acceptedBy,
		returnedDate: moment(a.returnedDate).format(DATE_FORMAT.TO),
		state: a.state
	}
))

const RequestOfReturning = () => {

	const {
		isLoading,
		data: requests,
		errorMessage
	} = useFetch([], `${API_URL}/admin/assignments/returns`, convertDataResponse);


	const [filterStateOption, setFilterStateOption] = useState('');
	const [dateFilterValue, setDateFilterValue] = useState('');
	const [searchText, setSearchText] = useState('');

	const dateFilterFormatted = moment(dateFilterValue, 'YYYY-MM-DD').format(DATE_FORMAT.TO);

	const requestsFiltered = useMemo(() => {
		return requests.filter(assignment => {
			if (dateFilterValue === '') return assignment.state.toLowerCase().includes(filterStateOption.toLowerCase());
			return assignment.state.toLowerCase().includes(filterStateOption.toLowerCase())
				&& isMatchExact(assignment.returnedDate, dateFilterFormatted);
		});
	}, [requests, filterStateOption, dateFilterValue, dateFilterFormatted]);

	const requestsSearched = useMemo(() => {
		return requestsFiltered.filter(assignment => {
			return assignment.assetCode.toLowerCase().includes(searchText.toLowerCase()) ||
				assignment.assetName.toLowerCase().includes(searchText.toLowerCase()) ||
				assignment.requestedBy.toLowerCase().includes(searchText.toLowerCase());
		});
	}, [searchText, requestsFiltered]);


	return (
		<div className="mt-4">
			<Container className="px-0">
				<div className="manager__heading pb-3">
					Return List
				</div>
				<Form className="manager__action mb-3">
					<Row className="actions__wrapper">
						<Col className='asset select col-3'>
							<Form.Select
								className="action__filter h-75"
								value={filterStateOption}
								onChange={evt => setFilterStateOption(evt.target.value)}
							>
								<option value="">State</option>
								<option value={FILTER_ASM_STATE_OPTIONS.COMPLETED}>Completed</option>
								<option value={FILTER_ASM_STATE_OPTIONS.WAITING_FOR_RETURNING}>Waiting for returning
								</option>
							</Form.Select>
						</Col>
						<Col className='asset calendar col-3'>
							<div className="h-75 date-picker">
								<FormControl
									id="returnedDate"
									type="date"
									className="date-input"
									placeholder="Returned Date"
									value={dateFilterValue}
									onChange={e => setDateFilterValue(e.target.value)}
								/>
							</div>
						</Col>
						<Col>
							<InputGroup className="h-75 search-group" style={{width: "52%", marginLeft: "auto"}}>
								<FormControl
									className="search-input"
									value={searchText}
									onChange={evt => setSearchText(evt.target.value)}
								/>
								<Button className="search-button btn-cancel" id="button-addon2" disabled>
									<img src="https://img.icons8.com/ios/22/000000/search--v1.png" alt="search"/>
								</Button>
							</InputGroup>
						</Col>
					</Row>
				</Form>
			</Container>
			<RequestTable requests={requestsSearched} isLoading={isLoading} errorMessage={errorMessage}/>
		</div>
	)

}
export default RequestOfReturning