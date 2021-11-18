import React, {useState} from 'react';
import logoimg from "../../assets/images/logonashtech.png";
import {NavLink} from "react-router-dom";

const headerTitle = {
    Home: 'Home',
    User: 'Manage User',
    Asset: 'Manage Asset',
    Assignment: 'Manage Assignment',
    Request: 'Request Of Returning',
    Report: 'Report',
}
const Sidebar = ({onChanceSidebar}) => {
    return (
        <div className="col col-lg-3 col-md-4 col-sm-2 ">
            <img className="logo-img" src={logoimg} />
            <div className="app-content__title">Online Asset Management</div>
            <nav className="category">
                <ul className="category-list">
                    <li className="category-item" onClick={() => onChanceSidebar(headerTitle.Home)}>
                        <NavLink exact activeClassName="selected" className="category-item__link" to="/">Home</NavLink>
                    </li>
                    <li  onClick={() => onChanceSidebar(headerTitle.User)}>
                        <NavLink  exact activeClassName="selected" className="category-item__link" to="/user">Manage User</NavLink>
                    </li>
                    <li className="category-item" onClick={() => onChanceSidebar(headerTitle.Asset)}>
                        <NavLink exact activeClassName="selected" className="category-item__link" to="/asset">Manage Asset</NavLink>
                    </li>
                    <li className="category-item" onClick={() => onChanceSidebar(headerTitle.Assignment)}>
                        <NavLink activeClassName="selected" className="category-item__link" to="/assignment">Manage Assignment</NavLink>
                    </li>
                    <li className="category-item" onClick={() => onChanceSidebar(headerTitle.Request)}>
                        <NavLink activeClassName="selected" className="category-item__link" to="/requestofreturning">Request Of Returning</NavLink>
                    </li>
                    <li className="category-item" onClick={() => onChanceSidebar(headerTitle.Report)}>
                        <NavLink activeClassName="selected" className="category-item__link" to="/report">Report</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;