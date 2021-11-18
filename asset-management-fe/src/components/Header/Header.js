import '../../assets/styles/custom.css'
import '../../assets/styles/main.css'
const Header = ({header}) =>{
    return (
        <nav className="header navbar navbar-expand-md">
            <div className="container-fluid">
                <div className="grid wide">
                    <span className="headerinfo">{header}</span>
                </div>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                        <li>
                            <a className="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export  default Header