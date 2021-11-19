import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import React from "react";

const ManageUser = () => {
    let history = useHistory();

    function handleClick() {
        history.push("/create");
    }

    return (
        <div>
            <Button className="btn-primary" onClick={handleClick}>Create New User</Button>
        </div>
    )
}
export default ManageUser