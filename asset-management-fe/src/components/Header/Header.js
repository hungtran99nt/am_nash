import './Header.css'
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import profileImage from "./github.png"
import ChangePasswordModal from "./ChangePassword/ChangePasswordModal";
import React, {useState} from "react";
import FirstLoginModal from "../FirstLoginModal/FirstLoginModal";
import {USER_STATUS} from "../../common/constants";

const Header = ({header, account, token, setToken}) => {

    const [showChangePass, setShowChangePass] = useState(false);
    const handleShowChangePass = () => setShowChangePass(true);
    const handleCloseChangePass = () => setShowChangePass(false);
    //
    // const [showNewPass, setShowNewPass] = useState(false);
    // const handleShowNewPass = () => setShowNewPass(true);
    // const handleCloseNewPass = () => setShowNewPass(false);

    let headerButton;
    if (account && token) {
        headerButton = (
            <DropdownButton id="dropdown-basic-button"
                            style={{float: "right"}}
                            title={
                                <div className="pull-left">
                                    <span>{account.type} ◂ {account.fullName} </span>
                                    <img className="thumbnail-image"
                                         src={profileImage}
                                         alt="user pic"
                                    />
                                </div>
                            }
            >
                <DropdownItem type="button"
                              className="btn del-button btn-outline-secondary"
                              onClick={handleShowChangePass}
                >
                    Change password
                </DropdownItem>
                <DropdownItem type="button"
                              className="btn del-button btn-outline-secondary"
                              data-bs-toggle="modal"
                              data-bs-target="#confirmModal"
                >
                    Logout
                </DropdownItem>
            </DropdownButton>
        )
    } else {
        headerButton = (
            <DropdownButton id="dropdown-basic-button"
                            title={
                                <div className="pull-left">
                                    <img className="thumbnail-image"
                                         src={profileImage}
                                         alt="user pic"
                                    />
                                </div>
                            }
            >
                <DropdownItem href="/login">Login</DropdownItem>
                <DropdownItem href="/">Sign up</DropdownItem>
            </DropdownButton>
        )
    }


    return (
        <nav className="header navbar w-100">
            <div className="grid wide">
                <div className="header">
                    <div className="header-info">{header}</div>
                    <div className="header-btn">
                        <span>{headerButton}</span>
                    </div>
                </div>
                <div className="modal fade" id="confirmModal" tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content"
                            style={{borderRadius: "1rem"}}
                        >
                            <div className="modal-header px-4"
                                 style={{backgroundColor: "#9fa2a34f", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}>
                                <h5 className="modal-title logout fw-bold"
                                    id="exampleModalLabel"
                                >Are you sure?</h5>
                            </div>
                            <div className="modal-body logout px-4">
                                <p style={{color: "black"}}>Do you want to log out?</p>
                                <div className="d-flex justify-content-between">
                                    <a href="/login" className="a-btn btn btn-primary"
                                       style={{backgroundColor: "#f44336", borderColor: "#f44336"}}
                                       onClick={() => {
                                           localStorage.clear();
                                       }}
                                    >Log out</a>
                                    <button type="button" className="a-btn btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            style={{backgroundColor: "transparent", color: "#6c757d"}}
                                    >Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ChangePasswordModal show={showChangePass} handleClose={handleCloseChangePass}/>
            </div>
        </nav>
    )
}
export default Header