import '../../assets/styles/custom.css'
import '../../assets/styles/main.css'
const Header = ({header}) =>{
    return (
        <header className="header">
            <div className="grid wide">
                <span className="headerinfo">{header}</span>
            </div>
        </header>
    )
}
export  default Header