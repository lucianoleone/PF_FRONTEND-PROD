import { Link } from "react-router-dom";
import logo from '../assets/images/logo-stack.jpg'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const LinkLogo = () => {
    const {logout}= useContext(AuthContext)
    return (
        <Link to="/" onClick={logout} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="brand-logo">
                <div className="brand-logo-icon">
                    <img src={logo} alt="" />
                </div>
                <div className="brand-logo-text">
                    <h2>stack</h2>
                </div>
            </div>
        </Link>
    );
};

export default LinkLogo;