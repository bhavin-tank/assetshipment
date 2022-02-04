import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Fragment} from "react";
import {logout} from "../redux/actions/auth";

function Header() {
    const {firebase, isSignedIn} = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand><img src='https://www.altimetrik.com/wp-content/uploads/2019/12/cropped-Altimetrik-logo-R-1024x187.png' width='300' alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/home" className="nav-link">Home</NavLink>
                        {isSignedIn ? (
                            <Fragment>
                                <NavLink to="/asset-received" className="nav-link">Asset Shipment</NavLink>
                                {/* <NavLink to="/barcode" className="nav-link">Barcode</NavLink> */}
                                <div className="nav-link" style={{cursor: 'pointer'}} onClick={() => {
                                    firebase.auth().signOut();
                                    dispatch(logout);
                                }}>Logout
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;