import './App.css'
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
     NavLink
} from "react-router-dom";
import logoimg from "./assets/images/logonashtech.png"
import ManageAssignment from "./pages/ManageAssignment/ManageAssignment";
import RequestOfReturning from "./pages/RequestOfReturning/RequestOfReturning";
import Home from "./pages/Home/Home";
import ManageAsset from "./pages/ManageAsset/ManageAsset";
import ManageUser from "./pages/ManageUser/ManageUser";
import Report from "./pages/Report/Report";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
    const [headerInfo, setHeaderInfo] = useState("");
    const onChanceSidebar = (itemClicked) => {
        setHeaderInfo(itemClicked);
    }
    return (
        <Router>
            <div>
                <Header header={headerInfo}/>
                <div className="appcontainer">
                    <div className="grid wide">
                        <div className="row app-content">
                            <Sidebar onChanceSidebar={onChanceSidebar}/>
                            <div className="col col-lg-9 col-md-8 col-sm-10">
                                <Switch>
                                    <Route path="/" exact>
                                        <Home/>
                                    </Route>
                                    <Route path="/user" exact>
                                        <ManageUser/>
                                    </Route>
                                    <Route path="/asset" exact>
                                        <ManageAsset/>
                                    </Route>
                                    <Route path="/assignment" exact>
                                        <ManageAssignment/>
                                    </Route>
                                    <Route path="/requestofreturning" exact>
                                        <RequestOfReturning/>
                                    </Route>
                                    <Route path="/report" exact>
                                        <Report/>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
        ;
}

