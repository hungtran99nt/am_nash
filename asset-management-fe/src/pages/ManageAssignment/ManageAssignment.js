import React, {useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import AssignmentTable from "../../components/AssignmentTable/AssignmentTable";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import {API_URL, DATE_FORMAT, FILTER_ASM_STATE_OPTIONS} from "../../common/constants";
import './ManageAssignment.css'
import {isMatchExact} from "../../common/config";

const convertDataResponse = res => res.data.map(a => (
    {
        id: a.id,
        assetCode: a.assetCode,
        assetName: a.assetName,
        assignTo: a.assignTo,
        assignBy: a.assignBy,
        assignedDate: moment(a.assignedDate).format(DATE_FORMAT.TO),
        state: a.state
    }
));

const ManageAssignment = () => {
    const history = useHistory();

    const handleCreateAssigmentClicked = () => {
        history.push("/assignment/create");
    }
    let recentUserId = history.location.state ? history.location.state.firstId : null;

    const {
        isLoading,
        data: assignments,
        errorMessage
    } = useFetch([], `${API_URL}/admin/assignments`, convertDataResponse);

    const stateKeys = Object.keys(FILTER_ASM_STATE_OPTIONS);
    const listStates = stateKeys.map(key =>
        <option
            key={FILTER_ASM_STATE_OPTIONS[key]}
            value={FILTER_ASM_STATE_OPTIONS[key]}
        >
            {FILTER_ASM_STATE_OPTIONS[key]}
        </option>
    )

    if (recentUserId) { // user created/edited: move it to the top of the list
        assignments.sort((a, b) => a.id === recentUserId ? -1 : b.id === recentUserId ? 1 : 0);
        window.history.replaceState(null, '');
    }

    const [filterStateOption, setFilterStateOption] = useState('');
    const [dateFilterValue, setDateFilterValue] = useState('');
    const [searchText, setSearchText] = useState('');

    const dateFilterFormatted = moment(dateFilterValue, 'YYYY-MM-DD').format(DATE_FORMAT.TO);

    const assignmentsFiltered = useMemo(() => {
        return assignments.filter(assignment => {
            if (dateFilterValue === '') return assignment.state.toLowerCase().includes(filterStateOption.toLowerCase());
            return assignment.state.toLowerCase().includes(filterStateOption.toLowerCase())
                && isMatchExact(assignment.assignedDate, dateFilterFormatted);
        });
    }, [assignments, filterStateOption, dateFilterValue, dateFilterFormatted]);

    const assignmentsSearched = useMemo(() => {
        return assignmentsFiltered.filter(assignment => {
            return assignment.assetCode.toLowerCase().includes(searchText.toLowerCase()) ||
                assignment.assetName.toLowerCase().includes(searchText.toLowerCase()) ||
                assignment.assignTo.toLowerCase().includes(searchText.toLowerCase());
        });
    }, [searchText, assignmentsFiltered]);

    return (
        <div className="mt-4">
            <Container className="px-0">
                <div className="manager__heading pb-3">
                    Manage Assignment
                </div>
                <Form className="manager__action mb-3">
                    <Row className="actions__wrapper">
                        <Col className='asset select'>
                            <Form.Select
                                className="action__filter h-75"
                                value={filterStateOption}
                                onChange={evt => setFilterStateOption(evt.target.value)}
                            >
                                <option value="">State</option>
                                {listStates}
                            </Form.Select>
                        </Col>
                        <Col className='asset calendar'>
                            <div className="h-75 date-picker">
                                <FormControl
                                    id="assignedDate"
                                    className="date-input"
                                    placeholder="Assigned Date"
                                    value={dateFilterValue}
                                    onChange={e => setDateFilterValue(e.target.value)}
                                    onFocus={e => e.target.type = 'date'}
                                    onBlur={e => {
                                        if (e.target.value === '') {
                                            e.target.type = 'text';
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                        <Col className="">
                            <InputGroup className="h-75 search-group">
                                <FormControl
                                    className="search-input"
                                    value={searchText}
                                    onChange={evt => setSearchText(evt.target.value)}
                                />
                                <Button className="search-button btn-cancel" id="button-addon2" disabled>
                                    <img src="https://img.icons8.com/ios/25/000000/search--v1.png" alt="search"/>
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col className="h-75">
                            <Button className="w-100 h-100" onClick={handleCreateAssigmentClicked}>Create new
                                assignment</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <AssignmentTable isLoading={isLoading} errorMessage={errorMessage}
                             assignments={assignmentsSearched} isMyAssignment={false}
                             isRecentUser={recentUserId}/>
        </div>
    )
}
export default ManageAssignment