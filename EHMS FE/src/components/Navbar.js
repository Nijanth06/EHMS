import React, { useState } from "react";
import "../styels/navbar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import logoImage from "../assest/images/Logo.png"
import NotificationsIcon from '@mui/icons-material/Call';


const Navbar = () => {
  const box_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [active, setActive] = useState(false);

  const toggleNav = () => {
    setActive(!active);
  };

  const closeNav = () => {
    setActive(false);
  };

  return (
    <section className="navBarSection">
      <div className={`header ${active ? "activeHeader" : ""}`}>
        <div className="logoDiv">
          <a href="#" className="logo"></a>
          <h1 className="flex">
            <img src={logoImage} width={20} height={20}></img>
            eHMS
          </h1>
        </div>
        <div className={`navBar ${active ? "activeNavbar" : ""}`}>
          <ul className="navLists flex" style={{ display: "flex", gap: "3rem" }}>
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="/" className="navLink">
                Popular
              </a>
            </li>
            <li className="navItem">
              <a href="/" className="navLink">
                About
              </a>
            </li>
            <li className="navItem">
              <a href="/" className="navLink">
                Blog
              </a>
            </li>
            <div className="headerBtns flex">
              <button className="btn loginBtn">
                <a href="/login">Login</a>
              </button>
              <button className="btn loginBtn">
                <a href="/patient-registration">Sign Up</a>
              </button>
              <button className="btn loginBtn">
                <a href="/login-staff">Staff</a>
              </button>
              <button className="btn_emergency rounded">
                <a href="/hotline-number">Hotline <NotificationsIcon /></a>
              </button>
            </div>
          </ul>
        </div>
        <div className="toggleNavbar" onClick={toggleNav}>
          {active ? (
            <AiFillCloseCircle className="icon" />
          ) : (
            <TbGridDots className="icon" />
          )}
        </div>
      </div>

    </section>
  );
};

export default Navbar;
