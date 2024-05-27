import React from "react";
import { useLocation } from "react-router-dom";

import Career from "./Career";
import NewMember from "./NewMember";
import ContactUs from "./ContactUs";
import Sidebar from "../../components/Sidebar/Sidebar";

const navLinks = [
  {
    tab: "new_member",
    page: "send-mail",
    title: "New Member",
  },
  {
    tab: "contact_us",
    page: "send-mail",
    title: "Contact Us",
  },
  {
    tab: "career",
    page: "send-mail",
    title: "Career",
  },
];

const SendMail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "new_member";

  return (
    <div className="flex items-start gap-8">
      <Sidebar navLinks={navLinks} activeTab={activeTab} className="flex-col" />

      {activeTab === "career" && <Career />}
      {activeTab === "new_member" && <NewMember />}
      {activeTab === "contact_us" && <ContactUs />}
    </div>
  );
};

export default SendMail;
