import React from 'react';
import noDataImg from '../../assets/images/nodata-found.png'

const NoDataFound = () => {
	return (
		<div className="d-flex justify-content-center">
			<img src={noDataImg} alt="no data found"/>
		</div>
	);
};

export default NoDataFound;