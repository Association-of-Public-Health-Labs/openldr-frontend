import React from "react";
import { FiGrid, FiThermometer, FiMapPin } from "react-icons/fi";

export default [
  {
    id: "home",
    page: "Dashboard",
    menuTitle: "Home",
    icon: <FiGrid size={16} />,
    url: "/dashboard"
  },
  {
    id: "lab",
    page: "Laboratory",
    menuTitle: "Lab",
    icon: <FiThermometer size={16} />,
    url: "/lab"
  },
  {
    id: "clinic",
    page: "Clinics",
    menuTitle: "Clinic",
    icon: <FiMapPin size={16} />,
    url: "/clinic"
  }
];
