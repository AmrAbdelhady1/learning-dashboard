import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import CareersMails from "./CareersMails";
import ContactUsMails from "./ContactUsMails";
import RegistersMails from "./RegistersMails";

const navLinks = [
  {
    tab: "regiesters",
    page: "mails",
    title: "Registers Mails",
  },
  {
    tab: "careers",
    page: "mails",
    title: "Careers Mails",
  },
  {
    tab: "contacts",
    page: "mails",
    title: "Contact Us Mails",
  },
];

const Mails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "regiesters";

  return (
    <div className="flex flex-col gap-6">
      <Sidebar navLinks={navLinks} activeTab={activeTab} />

      {activeTab === "careers" && <CareersMails />}
      {activeTab === "contacts" && <ContactUsMails />}
      {activeTab === "regiesters" && <RegistersMails />}
    </div>
  );
};

export default Mails;
