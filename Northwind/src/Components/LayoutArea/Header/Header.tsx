import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo"

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Logo></Logo>
			<h1>Northwind Traders</h1>
        </div>
    );
}

export default Header;
