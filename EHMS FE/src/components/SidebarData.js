import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { ROLES } from "../roles";
import HomeIcon from "@mui/icons-material/Home";
import ProfileIcon from "@mui/icons-material/Person";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin-dashboard",
    cName: "nav-text",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: [ROLES.admin],
  },
  {
    title: "Add Staff",
    path: "/add",
    icon: <IoIcons.IoMdPersonAdd />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: [ROLES.admin],
  },
  {
    title: "View Staff",
    path: "/viewHospitals",
    icon: <FaIcons.FaPeopleArrows />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: [ROLES.admin],

    subNav: [
      {
        title: "Receptionist",
        path: "/viewReceptionist",
        icon: <IoIcons.IoMdPeople />,
        allowedRoles: [ROLES.admin],
      },
      {
        title: "Doctor",
        path: "/viewDoctor",
        icon: <IoIcons.IoMdPeople />,
        allowedRoles: [ROLES.admin],
      },
      {
        title: "Nurse",
        path: "/viewNurse",
        icon: <IoIcons.IoMdPeople />,
        allowedRoles: [ROLES.admin],
      },
      {
        title: "HRP",
        path: "/viewHRP",
        icon: <IoIcons.IoMdPeople />,
        allowedRoles: [ROLES.admin],
      },
    ],
  },
  {
    title: "Reports",
    path: "reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: [ROLES.admin],
    subNav: [
      {
        title: "Patients",
        path: "/reports/reports1",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        allowedRoles: [ROLES.admin],
      },
      {
        title: "Reports",
        path: "/reports/reports2",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        allowedRoles: [ROLES.admin],
      },
      {
        title: "Reports 3",
        path: "/reports/reports3",
        icon: <IoIcons.IoIosPaper />,
        allowedRoles: [ROLES.admin],
      },
    ],
  },

  //doctor
  {
    title: "Dashboard",
    path: "/doctor-dashboard",
    icon: <IoIcons.IoIosHome />,
    allowedRoles: [ROLES.doctor],
  },
  {
    title: "Schedule Date",
    path: "/doctor-schedule",
    icon: <IoIcons.IoMdPeople />,
    allowedRoles: [ROLES.doctor],
  },
  {
    title: "My Profile",
    path: "/doctor-profile",
    icon: <IoIcons.IoIosPerson />,
    allowedRoles: [ROLES.doctor],
  },
  {
    title: "Patient Details",
    path: "/patient-details",
    icon: <IoIcons.IoIosPerson />,
    allowedRoles: [ROLES.doctor],
  },

  //patient
  {
    title: "Dashboard",
    path: "/patient-dashboard",
    icon: <IoIcons.IoIosHome />,
    allowedRoles: [ROLES.patient],
  },
  {
    title: "Make Appointment",
    path: "/appointent",
    icon: <FaIcons.FaEnvelopeOpenText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: [ROLES.patient],
  },
  {
    title: "Medical Records",
    path: "/records",
    icon: <IoIcons.IoIosPaper />,
    allowedRoles: [ROLES.patient],
  },
  {
    title: "My Profile",
    path: "/patient-profile",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.patient],
  },
  // {
  //   title: "My Appoinments",
  //   path: "/view-appoinment",
  //   icon: <IoIcons.IoMdPerson />,
  //   allowedRoles: [ROLES.patient],
  // },
  
  //receptionist
 
  {
    title: "Home",
    path: "/receptionist-dashboard",
    icon: <HomeIcon />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "My Profile",
    path: "/receptionist-profile",
    icon: <ProfileIcon/>,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Doctors",
    path: "/doctor-list",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Nurse",
    path: "/nurse-list",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Patients",
    path: "/patient-list",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Patients Attendence",
    path: "/patient-attendence",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Health Record Person",
    path: "/HealthRecordPerson-list",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "About",
    path: "/about",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Help",
    path: "/help",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.receptionist],
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    allowedRoles: [ROLES.patient, ROLES.admin],
  },

  //HRP
  //patient
  {
    title: "Dashboard",
    path: "/RecordPerson-dashboard",
    icon: <IoIcons.IoIosHome />,
    allowedRoles: [ROLES.recordPerson],
  },
  {
    title: "Medical Reports",
    path: "/mReports",
    icon: <IoIcons.IoIosPaper />,
    allowedRoles: [ROLES.recordPerson],
  },
  {
    title: "LAB Reports",
    path: "/labReports",
    icon: <IoIcons.IoIosPaper />,
    allowedRoles: [ROLES.recordPerson],
  },
  {
    title: "My Profile",
    path: "/patient-profile",
    icon: <IoIcons.IoMdPerson />,
    allowedRoles: [ROLES.recordPerson],
  },
];
