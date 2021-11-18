import '../../assets/styles/custom.css'
import '../../assets/styles/main.css'
import React from "react";

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