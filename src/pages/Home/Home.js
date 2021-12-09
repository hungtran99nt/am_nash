import {Button} from "react-bootstrap";
import "../../assets/styles/main.css"
import React from "react";
import {Redirect, useHistory} from "react-router-dom";

const Home = ({token}) => {
    if (!token){
        return <Redirect to="/login"/>
    }

    return (
    <div>
        <Button className="btn-change">Save</Button><br/>
        <Button className="">Disable</Button><br/>
        <Button className="btn-cancel">Cancel</Button><br/>
    </div>
)
}
export default Home
