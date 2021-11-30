import {Button} from "react-bootstrap";
import "../../assets/styles/main.css"
import React from "react";
import {Redirect, useHistory} from "react-router-dom";

const Home = ({token}) => {
    const history = useHistory();
    if (!token){
        return <Redirect to="/login"/>
    }
    const handleRedirectEditAssignment = () =>{
        history.push("/edit/assignment/1");
    }
    return (
    <div>
        <Button className="btn-change">Save</Button><br/>
        <Button className="">Disable</Button><br/>
        <Button className="btn-cancel">Cancel</Button><br/>
        <Button onClick={handleRedirectEditAssignment}>Edit assignment</Button>
    </div>
)
}
export default Home
