import React from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import './ManagerUser.css'
import Paginator from "../../components/Paginator/Paginator";
import UserTable from "../../components/UserTable/UserTable";
import useFetch from "../../hooks/useFetch";
import {useMemo, useState} from "react";

const ORDER_OPTIONS = {
	ASC: 'asc',
	DES: 'des'
}

const FILTER_OPTIONS = {
	NONE: '',
	STAFF: 'Staff',
	ADMIN: 'Admin',
}

const convertDataResponse = res => res.data.map(u => (
	{
		id: u.id,
		staffCode: u.staffCode,
		fullName: `${u.firstName} ${u.lastName}`,
		userName: u.username,
		joinDate: u.joinDate,
		type: u.type
	}
));

const ManageUser = () => {
	const [filterOption, setFilterOption] = useState(FILTER_OPTIONS.NONE);
	const [searchText, setSearchText] = useState('');
	const [sortNameOrder, setSortNameOrder] = useState(ORDER_OPTIONS.ASC);

	const {
		isLoading,
		data: users,
		errorMessage
	} = useFetch([], 'http://localhost:3000/users?_start=0&_end=19', convertDataResponse);

	const usersFiltered = useMemo(() => {
		return users.filter(user =>
			user.type.toLowerCase().includes(filterOption.toLowerCase()));
	}, [users, filterOption]);

	const usersSearched = useMemo(() => {
		return usersFiltered.filter(user => {
			user.fullName.toLowerCase().includes(searchText.toLowerCase()) });
	}, [users, searchText, usersFiltered]);

	return (
		<div className="mt-4">
			<Container className="px-0">
				<div className="manager-user__heading pb-3">
					ManageUser
				</div>
				<Form className="manager-user__action mb-3">
					<Row className="actions__wrapper">
						<Col className='col-2 flex-grow-1'>
							<Form.Select
								className="action__filter h-75"
								value={filterOption}
								onChange={evt => {
									setFilterOption(evt.target.value)
								}}
							>
								<option value={FILTER_OPTIONS.NONE}>Type</option>
								<option value={FILTER_OPTIONS.ADMIN}>Admin</option>
								<option value={FILTER_OPTIONS.STAFF}>Staff</option>
							</Form.Select>
						</Col>
						<Col className="col-4">
							<InputGroup className="h-75 search-group">
								<FormControl className="search-input"
											 onChange={evt => setSearchText(evt.target.value)}/>
								<Button className="search-button btn-cancel" id="button-addon2" disabled>
									<img src="https://img.icons8.com/ios/25/000000/search--v1.png" alt="search"/>
								</Button>
							</InputGroup>
						</Col>
						<Col className="col-2 h-75">
							<Button className="w-100 h-100">Create new user</Button>
						</Col>
					</Row>
				</Form>
			</Container>
			<UserTable users={usersSearched}/>
			<Paginator/>
		</div>
	)
}
export default ManageUser