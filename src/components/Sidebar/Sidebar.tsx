import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  navLinks: {
    tab: string;
    page: string;
    title: string;
  }[];
  activeTab: string;
  className?: string;
}

const Sidebar = ({ navLinks, activeTab, className }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {navLinks.map((item, index) => (
        <NavLink
          key={index}
          to={`/${item.page}?tab=${item.tab}`}
          className={`p-8 w-[280px] border shadow-md text-xl font-medium text-gray500 rounded-xl text-center ${
            activeTab === item.tab
              ? "bg-secondary border-secondary text-white"
              : "bg-white"
          }`}
        >
          {t(item.title)}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
