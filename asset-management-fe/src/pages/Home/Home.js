import {Button} from "react-bootstrap";
import "../../assets/styles/main.css"
import React from "react";
<<<<<<< HEAD
=======
import {Redirect} from "react-router-dom";
>>>>>>> b050828edf77ef809a89740f905f42259cb133f7

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
