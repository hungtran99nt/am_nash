import React from 'react';
import {Table} from "react-bootstrap";

const UserTable = ({users}) => {

	const tableData = users.map(({id, staffCode, fullName, userName, joinDate, type}) =>
		<tr key={id}>
			<td>{staffCode}</td>
			<td>{fullName}</td>
			<td>{userName}</td>
			<td>{joinDate}</td>
			<td>{type}</td>
			<td>
				<span>🖌</span>
				<span>❌</span>
			</td>
		</tr>
	);

	return (
		<Table>
			<thead>
			<tr>
				<th role="button" onClick={event => {
					console.log("Staff code")
				}}>Staff Code
				</th>
				<th role="button" onClick={event => {
					console.log("Full name")
				}}>Full Name
				</th>
				<th role="button" onClick={event => {
					console.log("Username")
				}}>UserName
				</th>
				<th role="button" onClick={event => {
					console.log("Join Date")
				}}>Join Date
				</th>
				<th role="button" onClick={event => {
					console.log("Type")
				}}>Type
				</th>
				<th/>
			</tr>
			</thead>
			<tbody>
			{tableData}
			</tbody>
		</Table>
	);
};

export default UserTable;