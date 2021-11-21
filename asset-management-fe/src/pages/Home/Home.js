import {Button} from "react-bootstrap";
import "../../assets/styles/main.css"
import React from "react";
import {useHistory} from "react-router-dom";

const Home = () => {
    let history = useHistory();

    const handleRedirectEditPage = () => {
        history.push("/edit/1");
    }
    return (
    <div>
        <Button className="btn-change">Save</Button><br/>
        <Button className="">Disable</Button><br/>
        <Button className="btn-cancel">Cancel</Button><br/>
        <Button className="btn-primary" onClick={handleRedirectEditPage}>Edit User</Button>
    </div>
)
}
export default Home
