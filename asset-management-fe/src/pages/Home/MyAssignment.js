import React from "react";
import { Container } from "react-bootstrap";
import AssignmentTable from "../../components/AssignmentTable/AssignmentTable";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import { API_URL, DATE_FORMAT } from "../../common/constants";

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

    const {
        isLoading,
        data: assignments,
        setData: setAssignments,
        errorMessage
    } = useFetch([], `${API_URL}/user/assignments`, convertDataResponse);

    return (
        <div className="mt-4">
            <Container className="px-0">
                <div className="manager__heading pb-3">
                    My Assignment
                </div>
            </Container>
            <AssignmentTable isLoading={isLoading} errorMessage={errorMessage}
                assignments={assignments}
                isMyAssignment={true}
                setAssignments={setAssignments}
            />
        </div>
    )
}
export default MyAssignment