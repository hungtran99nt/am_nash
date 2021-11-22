import './Header.css'
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import profileImage from "./github.png"

const Header = ({header, account, token}) => {
    let headerButton;
    if (account && token) {
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
            <div className="headerinfo nav-item">{header}</div>
            <div className="nav-item">
                {headerButton}
            </div>
            <div className="modal fade" id="confirmModal" tabIndex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color: "#f44336"}}>Are you
                                sure?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="post-title"></h2>
                            <h3 className="post-subtitle"></h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <a href="/login" className="btn btn-primary"
                               style={{backgroundColor: "#f44336", borderColor: "#f44336"}}
                               onClick={() => localStorage.clear()}
                            >Confirm</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header