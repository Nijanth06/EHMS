import React, { useState } from "react";
import { Link,useLocation} from "react-router-dom";
import "../styels/./Submenu.css";


const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  const showSubnav = () => setSubnav(!subnav);
  const isActive = location.pathname === item.path;
  return (
    <>
      <Link
        to={item.path}
        className={`sidebar-link ${isActive ? "active" : ""}`}
        onClick={item.subNav && showSubnav}
      >
        <div>
          {item.icon}
          <span className="sidebar-label">{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav  
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          const isSubNavActive = location.pathname === item.path;
          return (
            <Link to={item.path} className={`dropdown-link ${isSubNavActive} ? "active" : ""}`} key={index}>
              {item.icon}
              <span className="sidebar-label">{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
