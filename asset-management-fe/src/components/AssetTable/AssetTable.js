import React from 'react';
import {useHistory} from "react-router-dom";

const AssetTable = ({ assets, isLoading }) => {
	const history = useHistory();

	const handleRedirectEditAssetPage = (id) => {
		history.push(`/edit/asset/${id}`);
	}

	return (
		<div>
			Asset Table
		</div>
	);
};

export default AssetTable;