import React from 'react';

const Paginator = () => {
	return (
		<div className="row">
			<ul className="pagination justify-content-end">
				<li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
				<li className="page-item active"><a className="page-link" href="#">1</a></li>
				<li className="page-item"><a className="page-link" href="#">2</a></li>
				<li className="page-item"><a className="page-link" href="#">3</a></li>
				<li className="page-item"><a className="page-link" href="#">Next</a></li>
			</ul>
		</div>
	);
};

export default Paginator;