import React, {useMemo, useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import './ManagerUser.css'
import UserTable from "../../components/UserTable/UserTable";
import useFetch from "../../hooks/useFetch";
import {API_URL, DATE_FORMAT, FILTER_USER_OPTIONS} from "../../common/constants";
import moment from "moment";
import {Redirect, useHistory} from "react-router-dom";

const convertDataResponse = res => res.data.map(u => (
	{
		id: u.id,
		staffCode: u.staffCode,
		fullName: `${u.firstName} ${u.lastName}`,
		userName: u.username,
		joinDate:  moment(u.joinDate).format(DATE_FORMAT.TO),
		type: u.type,
		location: u.location
	}
));

const ManageUser = () => {
	const [filterOption, setFilterOption] = useState(FILTER_USER_OPTIONS.NONE);
	const [searchText, setSearchText] = useState('');
	let history = useHistory();

	const handleAddNewClick = () => {
		history.push("/create");
	}

	const {
		isLoading,
		data: users,
		errorMessage
	} = useFetch([], `${API_URL}/users/users`, convertDataResponse);

	if (errorMessage) window.location.reload(history.push("/login"));

	const usersFiltered = useMemo(() => {
		return users.filter(user =>
			user.type.toLowerCase().includes(filterOption.toLowerCase()));
	}, [users, filterOption]);

	const usersSearched = useMemo(() => {
		return usersFiltered.filter(user => {
			return user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
				user.staffCode.toLowerCase().includes(searchText.toLowerCase());

		}
	) }, [searchText, usersFiltered]);

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
								<option value={FILTER_USER_OPTIONS.NONE}>Type</option>
								<option value={FILTER_USER_OPTIONS.ADMIN}>Admin</option>
								<option value={FILTER_USER_OPTIONS.STAFF}>Staff</option>
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
							<Button className="w-100 h-100" onClick={handleAddNewClick}>Create new user</Button>
						</Col>
					</Row>
				</Form>
			</Container>
			{ errorMessage && <div>errorMessage</div> }
			{ usersSearched && <UserTable isLoading={isLoading} users={usersSearched}/>}
			{/*<Paginator/>*/}
		</div>
	)

}
export default ManageUser