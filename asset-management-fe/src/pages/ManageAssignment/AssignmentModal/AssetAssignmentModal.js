import React, {useMemo, useState} from 'react';
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import {assetColumns} from "./AssigmentModalAttribute";
import {FILTER_STATE_OPTIONS} from "../../../common/constants";

const AssetAssignmentModal = ({show, handleClose, assets, handlePassingData}) => {
    const [selectedRow, setSelectedRow] = useState({});
    const selectRow = (row, isSelected, rowIndex) => {
        setSelectedRow(row)
        console.log(selectedRow)
    }
    const sendData = () => {
        handlePassingData(selectedRow);
        handleClose();
    }
    /**
     * Search
     * Only show asset which has Available state
     */
    const [searchText, setSearchText] = useState('');
    const usersSearched = useMemo(() => {
        return assets.filter(asset => {
                return (asset.assetName?.toLowerCase().includes(searchText?.toLowerCase()) ||
                    asset.assetCode?.toLowerCase().includes(searchText?.toLowerCase())) &&
                    asset.state === FILTER_STATE_OPTIONS.AVAILABLE;
            }
        );
    }, [searchText, assets]);

    return (
        <Modal className="userModal" show={show} onHide={handleClose} centered>
            <Modal.Header className="text-danger">
                <Modal.Title>Select asset</Modal.Title>
                <InputGroup id="input-group-header">
                    <FormControl
                        placeholder="Search by name and code"
                        onChange={event => setSearchText(event.target.value)}
                    />
                    <InputGroup.Text id="search-icon"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                </InputGroup>
            </Modal.Header>
            <Modal.Body>
                <BootstrapTable
                    keyField='id'
                    columns={assetColumns}
                    data={usersSearched}
                    selectRow={{
                        mode: 'radio',
                        clickToSelect: true,
                        bgColor: 'rgba(108,117,125,0.53)',
                        onSelect: selectRow
                    }}
                />
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={sendData}
                            className="m-1"
                            style={{backgroundColor: "#f44336", borderColor: "#f44336"}}
                    >Save</Button>
                    <Button variant="secondary" onClick={handleClose}
                            className="m-1"
                            style={{backgroundColor: "transparent", color: "#6c757d"}}
                    >Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AssetAssignmentModal;