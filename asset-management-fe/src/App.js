import './App.css'
import React, {useState} from "react";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import logoimg from "./assets/images/logonashtech.png"
import ManageAssignment from "./pages/ManageAssignment/ManageAssignment";
import RequestOfReturning from "./pages/RequestOfReturning/RequestOfReturning";
import Home from "./pages/Home/Home";
import ManageAsset from "./pages/ManageAsset/ManageAsset";
import ManageUser from "./pages/ManageUser/ManageUser";
import Report from "./pages/Report/Report";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";

import CreateUserPage from "./pages/ManageUser/CreateUserPage/CreateUserPage";
import Profile from "./pages/Profile/Profile";
import {API_URL} from "./common/constants";
import useFetch from "./hooks/useFetch";
import moment from "moment";
import EditUserPage from "./pages/ManageUser/EditUserPage/EditUserPage";
import DenyPage from "./pages/DenyPage/DenyPage";

const headerTitle = {
    Home: 'Home',
    User: 'Manage User',
    Asset: 'Manage Asset',
    Assignment: 'Manage Assignment',
    Request: 'Request Of Returning',
    Report: 'Report',
}
const convertDataResponse = res => (
    {
        fullName: `${res.data.lastName} ${res.data.firstName}`,
        userName: res.data.username,
        type: res.data.type,
    }
);
export default function App() {
    const [headerInfo, setHeaderInfo] = useState(headerTitle.Home);
    const [token, setToken] = useState(localStorage.getItem("TOKEN"));
    let curUsername = localStorage.getItem("USERNAME");
    const {
        isLoading,
        data: account,
        errorMessage
    } = useFetch({}, `${API_URL}/users/user?username=${curUsername}`, convertDataResponse);
    return (
        <Router>
            <div>
                <Header
                    header={headerInfo}
                    account={account}
                />
                <div className="appcontainer">
                    <div className="grid wide">
                        <div className="row app-content">
                            <div className="col col-lg-3 col-md-4 col-sm-2 ">
                                <img className="logo-img" src={logoimg}/>
                                <div className="app-content__title">Online Asset Management</div>
                                {account && <nav className="category">
                                    <ul className="category-list">
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Home)}>
                                            <NavLink exact activeClassName="selected" className="category-item__link"
                                                     to="/">Home</NavLink>
                                        </li>
                                        {account.type === "Admin" &&
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.User)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/user">Manage User</NavLink>
                                        </li>}
                                        {account.type === "Admin" &&
                                        <li className="category-item" onClick={() => setHeaderInfo(headerTitle.Asset)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/asset">Manage Asset</NavLink>
                                        </li>}
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
                                        {account.type === "Admin" && <li className="category-item"
                                                                         onClick={() => setHeaderInfo(headerTitle.Report)}>
                                            <NavLink activeClassName="selected" className="category-item__link"
                                                     to="/report">Report</NavLink>
                                        </li>}
                                    </ul>
                                </nav>}
                            </div>
                            <div className="col col-lg-9 col-md-8 col-sm-10">
                                <Switch>
                                    <Route path="/" exact>
                                        <Home/>
                                    </Route>
                                    <Route path="/user" exact
                                    render={ () => account.type === "Admin" ? <ManageUser/> : <DenyPage/>}
                                    />
                                    <Route path="/asset" exact
                                           render={ () => account.type === "Admin" ? <ManageAsset/> : <DenyPage/>}
                                    />
                                    <Route path="/assignment" exact>
                                        <ManageAssignment/>
                                    </Route>
                                    <Route path="/requestofreturning" exact>
                                        <RequestOfReturning/>
                                    </Route>
                                    <Route path="/report" exact
                                            render={ () => account.type === "Admin" ? <Report/> : <DenyPage/>}
                                    />
                                    <Route path="/login" exact>
                                        <Login/>
                                    </Route>
                                    <Route path="/profile" exact>
                                        <Profile/>
                                    </Route>
                                    <Route path="/create" exact>
                                        <CreateUserPage/>
                                    </Route>
                                    <Route path="/edit/:id" exact>
                                        <EditUserPage/>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}
