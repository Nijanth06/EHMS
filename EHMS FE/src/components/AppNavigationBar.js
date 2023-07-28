import React from "react";

import {
    Container,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../app/features/authSlice";
import { decrypt } from "../utils/aes/AES";

const AppNavigationBar = () => {
    const authUser = (useSelector(state => state.auth))
    const user = decrypt(authUser.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //console.log(user);


    return (
        <Navbar  bg="primary" variant="dark">
            <Container>
                <Navbar.Brand><div style={{justifyContent:" flex-start"}}>Emotional Health Patient Management System</div></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">   
                    <Navbar.Text>
                        Signed in as:
                    </Navbar.Text>
                    <NavDropdown title={user.toString()} id="basic-nav-dropdown" style={{ marginLeft: "5px", color: "white" }}>
                        <NavDropdown.Item onClick={() => {
                            dispatch(logOut())
                            navigate('/')
                        }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavigationBar;
