import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import reactLogo from "../../assets/logo.png";
import "./navigation.styles.scss";

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <img src={reactLogo} width="300" alt="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/titles">
                        TITLES
                    </Link>
                    <Link className="nav-link" to="/other">
                        OTHER
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}
export default Navigation;