import UnAuthorized from "./pages/UnAuthorized";
import { ROLES } from "./roles";
import AdminAdd from "./views/admin/AdminAdd";
import AdminView from "./views/admin/AdminView";
import Home from "./views/admin/Home";
import Docbook from "./views/doctor/Docbook";
import DoctorDashboard from "./views/doctor/DoctorDashboard";
import DoctorTimeSchdule from "./views/doctor/DoctorTimeSchedule";
import Profile from "./views/doctor/Profile";
import AppointmentBooking from "./views/patient/AppointmentBookingTable";
import MedicalRecord from "./views/patient/PatientMediRecord";
import PatientProfile from "./views/patient/PatientProfile";
import ViewAppoinment from "./views/patient/ViewAppoinment";
import ContentBar from "./views/receptionist/ContentBar";
import ContentBarview from "./views/receptionist/receptionPages/ContentBarview";
import ReceptionistDashboard from "./views/receptionist/receptionPages/ReceptionistDashboard";
import ReceptionistProfile from "./views/receptionist/receptionPages/ReceptionistProfile";

import AdminViewReceptionist from "./views/admin/AdminViewReceptionist";
import AdminViewDoctor from "./views/admin/AdminViewDoctor";
import AdminViewNurse from "./views/admin/AdminViewNurse";
import AdminViewHRP from "./views/admin/AdminViewHRP";
import DoctorList from "./views/receptionist/receptionPages/DoctorList";
import NurseList from "./views/receptionist/receptionPages/NurseList";
import HealthRecordPersonList from "./views/receptionist/receptionPages/HealthRecordPersonList";

import PatientDetail from "./views/doctor/PatientDetail";
import PatientHistory from "./views/doctor/PatientHistory";
import AddPrescription from "./views/doctor/AddPrescriptionForm"
import HRPdashboard from "./views/healthRecordPerson/healthRecordPages/HRPdashboard";

export const routes = [
  {
    path: "/admin-dashboard",
    element: <Home />,
    allowedRoles: [ROLES.admin],
  },
  {
    path: "/add",
    element: <AdminAdd />,
    allowedRoles: [ROLES.admin],
  },
  {
    path: "/viewHospitals",
    element: <AdminView />,
    allowedRoles: [ROLES.admin],
  },

  {
    path: "/viewReceptionist",
    element: <AdminViewReceptionist />,
    allowedRoles: [ROLES.admin],
  },

  {
    path: "/ViewDoctor",
    element: <AdminViewDoctor />,
    allowedRoles: [ROLES.admin],
  },

  {
    path: "/ViewNurse",
    element: <AdminViewNurse />,
    allowedRoles: [ROLES.admin],
  },

  {
    path: "/ViewHRP",
    element: <AdminViewHRP />,
    allowedRoles: [ROLES.admin],
  },

  //patient
  {
    path: "/patient-dashboard",
    element: <ViewAppoinment />,
    allowedRoles: [ROLES.patient],
  },
  {
    path: "/records",
    element: <MedicalRecord />,
    allowedRoles: [ROLES.patient],
  },
  {
    path: "/appointent",
    element: <Docbook />,
    allowedRoles: [ROLES.patient],
  },
  {
    path: "/booking/:id/:date",
    element: <AppointmentBooking />,
    allowedRoles: [ROLES.patient, ROLES.receptionist],
  },
  {
    path: "/patient-profile",
    element: <PatientProfile />,
    allowedRoles: [ROLES.patient],
  },
  {
    path: "/view-appoinment",
    element: <ViewAppoinment />,
    allowedRoles: [ROLES.patient],
  },

  // doc
  {
    path: "/doctor-dashboard",
    element: <DoctorDashboard />,
    allowedRoles: [ROLES.doctor],
  },
  {
    path: "/doctor-profile",
    element: <Profile />,
    allowedRoles: [ROLES.doctor],
  },
  {
    path: "/doctor-schedule",
    element: <DoctorTimeSchdule />,
    allowedRoles: [ROLES.doctor],
  },

  {
    path: "/patient-details",
    element: <PatientDetail />,
    allowedRoles: [ROLES.doctor],
  },

  {
    path: "/patient-history/:id",
    element: <PatientHistory />,
    allowedRoles: [ROLES.doctor],
  },

  {
    path: "/add-prescription/:id",
    element: <AddPrescription />,
    allowedRoles: [ROLES.doctor],
  },

  //Receptionist
  {
    path: "/receptionist-profile",
    element: <ReceptionistProfile />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    path: "/receptionist-dashboard",
    element: <ReceptionistDashboard />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    path: "/patient-list",
    element: <ContentBar />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    path: "/patient-attendence",
    element: <ContentBarview />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    path: "/doctor-list",

    element: <DoctorList />,

    allowedRoles: [ROLES.receptionist],
  },

  {
    path: "/HealthRecordPerson-list",

    element: <HealthRecordPersonList />,

    allowedRoles: [ROLES.receptionist],
  },

  {
    path: "/nurse-list",

    element: <NurseList />,

    allowedRoles: [ROLES.receptionist],
  },

  //HRP
  {
    path: "/RecordPerson-dashboard",
    element: <HRPdashboard/>,
    allowedRoles: [ROLES.recordPerson],

  },
  //last route
  {
    path: "/*",
    element: <UnAuthorized />,
    allowedRoles: [ROLES.admin, ROLES.patient, ROLES.staff, ROLES.doctor],
  },
];
