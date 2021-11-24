import React from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {FILTER_STATE_OPTIONS} from "../../common/constants";
import AssetTable from "../../components/AssetTable/AssetTable";
import './ManageAsset.css'
import useFetch from "../../hooks/useFetch";
import {useHistory} from "react-router-dom";

const convertDataResponse = res => res.data;


const ManageAsset = () => {
	const history = useHistory();

	const {
		isLoading,
		data: assets,
		errorMessage
	} = useFetch([], `http://localhost:3000/assets`, convertDataResponse);

	const {
		data: categories,
	} = useFetch([], `http://localhost:3000/categories`, convertDataResponse);

	const stateKeys = Object.keys(FILTER_STATE_OPTIONS);
	const listStates = stateKeys.map(key => <option key={FILTER_STATE_OPTIONS[key]} value={FILTER_STATE_OPTIONS[key]}>{FILTER_STATE_OPTIONS[key]}</option>)
	const listCategories = categories.map(cate => <option key={cate.id} value={cate.id}>{cate.categoryName}</option>);

	const handleRedirectCreateAssetPage = () => {
		history.push("/create/asset");
	}

	return (
		<div className="mt-4">
			<Container className="px-0">
				<div className="manager__heading pb-3">
					Manange Asset
				</div>
				{/*Action bar*/}
				<Form className="manager__action mb-3">
					<Row className="actions__wrapper">
						<Col className='asset select'>
							<Form.Select
								className="h-75"
								// value={filterOption}
								onChange={evt => {
									// setFilterOption(evt.target.value)
								}}
							>
								<option value="">State</option>
								{listStates}
							</Form.Select>
						</Col>
						<Col className='asset select'>
							<Form.Select
								className="h-75"
								// value={filterOption}
								onChange={evt => {
									// setFilterOption(evt.target.value)
								}}
							>
								<option value="">Category</option>
								{listCategories}
							</Form.Select>
						</Col>
						<Col className="">
							<InputGroup className="h-75 search-group">
								<FormControl className="search-input"/>
								{/*// onChange={evt => setSearchText(evt.target.value)}/>*/}
								<Button className="search-button btn-cancel" id="button-addon2" disabled>
									<img src="https://img.icons8.com/ios/25/000000/search--v1.png" alt="search"/>
								</Button>
							</InputGroup>
						</Col>
						<Col className="h-75">
							<Button className="w-100 h-100" onClick={handleRedirectCreateAssetPage}>Create new
								asset</Button>
						</Col>
					</Row>
				</Form>
			</Container>
			<AssetTable assets={assets} isLoading={isLoading} errorMessage ={errorMessage}/>
		</div>
	)
}
export default ManageAsset