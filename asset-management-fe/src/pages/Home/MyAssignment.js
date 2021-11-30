import React from "react";
import {useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";
import AssignmentTable from "../../components/AssignmentTable/AssignmentTable";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import {API_URL, DATE_FORMAT} from "../../common/constants";
import './MyAssignment.css'

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

const MyAssignment = () => {
    const history = useHistory();

    const {
        isLoading,
        data: assignments,
        errorMessage
    } = useFetch([], `${API_URL}/users/2/assignments`, convertDataResponse);
    //console.log(assignments);

    return (
        <div className="mt-4">
            <Container className="px-0">
                <div className="manager__heading pb-3">
                    My Assignment
                </div>
            </Container>
            <AssignmentTable isLoading={isLoading} errorMessage={errorMessage} assignments={assignments}
                             isMyAssignment={true}/>
        </div>
    )
}
export default MyAssignment