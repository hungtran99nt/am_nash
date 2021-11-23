import './Header.css'
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import profileImage from "./github.png"

const Header = ({header, account}) => {
    let headerButton;
    if (account) {
        console.log(account.fullName)
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
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem type="button" className="btn del-button btn-outline-secondary" data-bs-toggle="modal"
                              data-bs-target="#confirmModal">Logout</DropdownItem>
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
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are you
                                    sure?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2>Log out...</h2>
                            </div>
                            <div className="modal-footer">
                                <a href="/login" className="btn btn-primary"
                                   style={{backgroundColor: "#f44336", borderColor: "#f44336"}}
                                   onClick={() => localStorage.clear()}
                                >Log out</a>
                                <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header