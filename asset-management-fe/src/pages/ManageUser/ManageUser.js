import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import './ManagerUser.css'
import Paginator from "../../components/Paginator/Paginator";
import UserTable from "../../components/UserTable/UserTable";

const ManageUser = () => {
	return (
		<div className="mt-4">
			<Container className="px-0">
				<div className="manager-user__heading pb-3">
					ManageUser
				</div>
				<Form className="manager-user__action mb-3">
					<Row className="actions__wrapper">
						<Col className='col-2 flex-grow-1'>
							<Form.Select className="action__filter h-75">
								<option>Type</option>
								<option value="admin">Admin</option>
								<option value="staff">Staff</option>
							</Form.Select>
						</Col>
						<Col className="col-4">
							<InputGroup className="h-75 search-group">
								<FormControl className="search-input"/>
								<Button className=" search-button btn-cancel" id="button-addon2">
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
			<UserTable/>
			<Paginator/>
		</div>
	)
}
export default ManageUser