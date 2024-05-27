import React from "react";
import { useLocation } from "react-router-dom";

import Services from "./Services";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubServices from "./SubServices/SubServices";

const navLinks = [
  {
    tab: "services",
    page: "services",
    title: "Services",
  },
  {
    tab: "sub_services",
    page: "services",
    title: "Sub Services",
  },
];

const MainServices = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "services";

  return (
    <div className="flex flex-col gap-6">
      <Sidebar navLinks={navLinks} activeTab={activeTab} />

      {activeTab === "sub_services" ? <SubServices /> : <Services />}
    </div>
  );
};

export default MainServices;
