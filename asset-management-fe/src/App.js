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
import CreateUserPage from "./pages/ManageUser/CreateUserPage/CreateUserPage";

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
                                <img className="logo-img" src={logoimg}/>
                                <div className="app-content__title">Online Asset Management</div>
                                <nav className="category">
                                    <ul className="category-list">
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Home)}>
                                            <NavLink exact activeClassName="selected" className="category-item__link"
                                                     to="/">Home</NavLink>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.User)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/user">Manage User</NavLink>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Asset)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/asset">Manage Asset</NavLink>
                                        </li>
                                        <li className="category-item"
                                            onClick={() => setHeaderInfo(headerTitle.Assignment)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/assignment">Manage Assignment</NavLink>
                                        </li>
                                        <li className="category-item"
                                            onClick={() => setHeaderInfo(headerTitle.Request)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/requestofreturning">Request Of Returning</NavLink>
                                        </li>
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Report)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/report">Report</NavLink>
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
                                    <Route path="/create" exact>
                                        <CreateUserPage/>
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

