import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import LayoutWrapper from "../LayoutWrapper";
import Header from "../../components/Header/Header";

const LoggedInLayout = ({ children }: { children: ReactNode }) => {
  const asscessToken = localStorage.getItem("access_token");

  return !asscessToken ? (
    <Navigate to="/login" />
  ) : (
    <div className="min-h-screen flex flex-col min-w-[1200px]">
      <Header />
      <main className="p-10 bg-[#eeeff2] flex-grow">{children}</main>
    </div>
  );
};

export default LayoutWrapper(LoggedInLayout);
