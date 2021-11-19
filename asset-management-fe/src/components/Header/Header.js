import '../../assets/styles/custom.css'
import '../../assets/styles/main.css'

import './Header.css'
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

const Header = ({header, user, token}) => {
    console.log(token);
    let headerButton;
    if (token !== null) {
        headerButton = (
            <div>
                <p></p>
                <DropdownButton id="dropdown-basic-button" title="" style={{float:"right"}}>
                    <DropdownItem href="/login">Profile</DropdownItem>
                    <DropdownItem type="button" className="btn del-button btn-outline-secondary" data-bs-toggle="modal"
                                  data-bs-target="#confirmModal">Logout</DropdownItem>
                </DropdownButton>
                <div className="modal fade" id="confirmModal" tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel" style={{color: "#f44336"}}>Are you sure?</h5>
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
                                <a href="/login" className="btn btn-primary" style={{backgroundColor: "#f44336", borderColor: "#f44336"}}
                                        onClick={ () => localStorage.clear() }
                                >Confirm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else {
        headerButton = (
            <DropdownButton id="dropdown-basic-button" title="">
                <DropdownItem href="/login">Login</DropdownItem>
                <DropdownItem href="/">Sign up</DropdownItem>
            </DropdownButton>
        )
    }
    console.log(token);

    return (
        <nav className="header navbar navbar-expand-md">
            <div className="container-fluid">
                <div className="grid wide">
                    <span className="headerinfo">{header}</span>
                </div>
                <div>
                    {headerButton}
                </div>
            </div>
        </nav>
    )
}
export default Header