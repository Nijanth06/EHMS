import React, {  } from "react";
import { Route, Routes, } from "react-router-dom";
import Home from "../pages/Home";
import StaffLogin from "../pages/StaffLogin";
import PaientLogin from "../pages/PaientLogin";
import PatientRegisteration from "../pages/PatientRegisteration";
import HotlinePage from "../pages/HotlinePage";

const HomeContent = () => {

  return (
    <Routes>
      <Route path="/patient-registration" element={<PatientRegisteration />} />
      <Route path="/login-staff" element={<StaffLogin/>} />
      <Route path="/login" element={<PaientLogin />} />
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<PaientLogin />} />
      <Route path="/hotline-number" element={<HotlinePage />} />
    </Routes>
  );
};

export default HomeContent;
