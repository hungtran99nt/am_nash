import React from 'react';
import {Table} from "react-bootstrap";

const UserTable = () => {
	return (
		<Table>
			<thead>
			<tr>
				<th>#</th>
				<th>Staff Code</th>
				<th>Full Name</th>
				<th>User Name</th>
				<th>Join Date</th>
				<th>Type</th>
				<th/>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>1</td>
				<td>Mark</td>
				<td>Otto</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
			</tr>
			<tr>
				<td>2</td>
				<td>Mark</td>
				<td>Otto</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
			</tr><tr>
				<td>3</td>
				<td>Mark</td>
				<td>Otto</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
			</tr><tr>
				<td>4</td>
				<td>Mark</td>
				<td>Otto</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
				<td>@mdo</td>
			</tr>
			</tbody>
		</Table>
	);
};

export default UserTable;