import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

const ManageAssignment = () =>{
    let history = useHistory();
    const handleRedirectEditAssigment = () =>{
        history.push("edit/assignment/1");
    }
    return(
        <div>
            <Button onClick={handleRedirectEditAssigment}>Edit Assignment</Button>
        </div>
    )
}
export default ManageAssignment