import React from "react";
import { FiGrid, FiThermometer, FiMapPin } from "react-icons/fi";

// export default [
//   {
//     id: "home",
//     page: "Dashboard",
//     menuTitle: "Home",
//     icon: <FiGrid size={16} />,
//     url: "/dashboard"
//   },
//   {
//     id: "lab",
//     page: "Laboratory",
//     menuTitle: "Lab",
//     icon: <FiThermometer size={16} />,
//     url: "/lab"
//   },
//   {
//     id: "clinic",
//     page: "Clinics",
//     menuTitle: "Clinic",
//     icon: <FiMapPin size={16} />,
//     url: "/clinic"
//   }
// ];

const covid19 = [
  {
    id: "home",
    page: "Dashboard",
    menuTitle: "Home",
    icon: <FiGrid size={16} />,
    url: "/covid19",
  },
  {
    id: "covid19results",
    page: "Resultados de Covid 19",
    menuTitle: "Resultados",
    icon: <FiThermometer size={16} />,
    url: "/covid19results",
  },
];

const viralload = [
  {
    id: "home",
    page: "Dashboard",
    menuTitle: "Principal",
    icon: <FiGrid size={16} />,
    url: "/dashboard",
  },
  {
    id: "lab",
    page: "Laboratory",
    menuTitle: "Lab",
    icon: <FiThermometer size={16} />,
    url: "/lab",
  },
  {
    id: "clinic",
    page: "Provincia/Distrito/US",
    menuTitle: "Provincia",
    icon: <FiMapPin size={16} />,
    url: "/clinic",
  },
  // {
  //   id: "reports",
  //   page: "Relatorio Semanal",
  //   menuTitle: "Relatorios",
  //   icon: <FiMapPin size={16} />,
  //   url: "/weeklyreports",
  // },
];

export { covid19, viralload };
