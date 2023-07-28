import "../styels/app.css";
import React from "react";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import HomeContent from "../components/HomeContent";
import HomeFooter from "../components/HomeFooter";

const OuterLayout = () => {
  return (
    <>
      <Navbar />
      <HomeContent />
      <HomeFooter/>
    </>
  );
};

export default OuterLayout;
