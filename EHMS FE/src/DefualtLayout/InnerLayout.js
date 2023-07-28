import AppContent from "../components/AppContent";
// import "../styels/dashboard.css";
import "../styels/content.css";
import React from "react";
import NavigationBar from "../components/AppNavigationBar";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/AppSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const InnerLayout = () => {

  const isFloaded = useSelector((state) => state.slider);
  console.log(isFloaded.isFloded);
  // useEffect(() => {}, [isFloaded]);

  return (
    <>
      <Sidebar />
      <div style={{ marginTop: "10rem" }} className={isFloaded.isFloded ? "appContent" : ""}>
        <AppContent />
      </div>    </>
  );
};

export default InnerLayout;
