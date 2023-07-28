import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import PatientLogin from "./pages/PaientLogin";
import PatientRegisteration from "./pages/PatientRegisteration";
import StaffLogin from "./pages/StaffLogin";
// import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { useDispatch, useSelector } from "react-redux";
// import Home from "./pages/Home";
import { ROLES } from "./roles";
import InnerLayout from "./DefualtLayout/InnerLayout";
import OuterLayout from "./DefualtLayout/OuterLayer";
import Home from "./pages/Home";
import './App.css';

function App() {
  const authUser = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      {/* All publically available URLs * */}
      {authUser.user !== null ? null : (
        <>
          <Route path="/*" element={<OuterLayout />}>
           
          </Route>
        </>
      )}
      {/* Internal URLs */}
      <Route
        element={
          <RequireAuth
            allowedRoles={[
              ROLES.admin,
              ROLES.patient,
              ROLES.staff,
              ROLES.doctor,
              ROLES.receptionist,
              ROLES.recordPerson
            ]}
          />
        }
      >
        <Route path="/*" element={<InnerLayout />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
