import './App.css'
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logoimg from "./assets/images/logonashtech.png"
import ManageAssignment from "./pages/ManageAssignment/ManageAssignment";
import RequestOfReturning from "./pages/RequestOfReturning/RequestOfReturning";
import Home from "./pages/Home/Home";
import ManageAsset from "./pages/ManageAsset/ManageAsset";
import ManageUser from "./pages/ManageUser/ManageUser";
import Report from "./pages/Report/Report";
import Header from "./components/Header/Header";
const headerTitle = {
    Home: 'Home',
    User: 'Manage User',
    Asset: 'Manage Asset',
    Assignment: 'Manage Assignment',
    Request: 'Request Of Returning',
    Report: 'Report',
}
export default function App() {
    const [headerInfo, setHeaderInfo] = useState(headerTitle.Home);
    return (
        <Router>
            <div>
                <Header header={headerInfo}/>
                <div className="appcontainer">
                    <div className="grid wide">
                        <div className="row app-content">
                            <div className="col col-lg-3 col-md-4 col-sm-2 ">
                                <img className="logo-img" src={logoimg} />
                                <div className="app-content__title">Online Asset Management</div>
                                <nav className="category">
                                    <ul className="category-list">
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Home)}>
                                            <Link style={{ textDecoration: 'none' }} to="/">Home</Link>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.User)}>
                                            <Link style={{ textDecoration: 'none' }} to="/user">Manage User</Link>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Asset)}>
                                            <Link style={{ textDecoration: 'none' }} to="/asset">Manage Asset</Link>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Assignment)}>
                                            <Link style={{ textDecoration: 'none' }} to="/assignment">Manage Assignment</Link>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Request)}>
                                            <Link style={{ textDecoration: 'none' }} to="/requestofreturning">Request Of Returning</Link>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Report)}>
                                            <Link style={{ textDecoration: 'none' }} to="/report">Report</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
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

