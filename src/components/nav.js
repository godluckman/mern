import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="lb-header">
            <nav>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><NavLink to="/get">Get all data</NavLink></li>
                        <li><NavLink to="/">Home page</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Nav;