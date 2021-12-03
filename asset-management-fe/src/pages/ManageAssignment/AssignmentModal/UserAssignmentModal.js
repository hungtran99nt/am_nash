import React, {useMemo, useState} from 'react';
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import './UserAssignmentModal.css'
import BootstrapTable from 'react-bootstrap-table-next'
import {userColumns} from "./AssigmentModalAttribute";
import {BiSearchAlt} from "react-icons/all";
import jwt_decode from "jwt-decode";

const UserAssignmentModal = ({show, handleClose, users, handlePassingData}) => {
    const [selectedRow, setSelectedRow] = useState({});
    const selectRow = (row, isSelected, rowIndex) => {
        setSelectedRow(row)
    }
    const sendData = () => {
        handlePassingData(selectedRow);
        handleClose();
    }
    /**
     * Search
     * Only show who has active account and not show who is signing in
     */
    const [searchText, setSearchText] = useState('');
    const usersSearched = useMemo(() => {
        return users.filter(user => {
                return (user.fullName?.toLowerCase().includes(searchText?.toLowerCase()) ||
                    user.staffCode?.toLowerCase().includes(searchText?.toLowerCase())) &&
                    user.username !== jwt_decode(localStorage.getItem('TOKEN')).sub;
            }
        );
    }, [searchText, users]);

    return (
        <Modal id="userModal" show={show} onHide={handleClose} centered backdrop={false}>
            <Modal.Header className="text-danger">
                <Modal.Title>Select user</Modal.Title>
                <InputGroup id="input-group-header">
                    <FormControl
                        placeholder="Search by name and code"
                        onChange={event => setSearchText(event.target.value)}
                    />
                    <InputGroup.Text id="search-icon"><BiSearchAlt/></InputGroup.Text>
                </InputGroup>
            </Modal.Header>
            <Modal.Body>
                <BootstrapTable
                    keyField='id'
                    columns={userColumns}
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

export default UserAssignmentModal;