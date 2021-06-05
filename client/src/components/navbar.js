import React from "react"
import {Link} from "react-router-dom"

const navBar = () => {

    return(
        <nav>
        <div className="nav-wrapper white">
            <Link to="/" className="brand-logo left">Grambook</Link>
            <ul id="nav-mobile" className="right">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/createpost"><i className="material-icons" style={{color:"red"}}>add_circle_outline</i></Link></li>
            </ul>
        </div>
        </nav>
    )

}

export default navBar;