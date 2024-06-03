import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import { Link, useLocation } from "react-router-dom";

import { LogoSvg } from "../../assets/svg/login-svg";
import { LogOutSvg } from "../../assets/svg/header-svg";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Careers",
    path: "/careers",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Reviews",
    path: "/reviews",
  },
  {
    name: "Mails",
    path: "/mails",
  },
];

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.dir =
      localStorage.getItem("i18nextLng") === "ar" ? "rtl" : "ltr";
  }, []);

  const changeLanguage = () => {
    let lng = "";
    if (localStorage.getItem("i18nextLng") === "ar") {
      lng = "en";
    } else {
      lng = "ar";
    }
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const handleLogOut = () => {
    localStorage.setItem("access_token", "");
    window.location.reload();
  };

  return (
    <div className="px-10 flex items-center justify-between w-full bg-white shadow-2xl border-b">
      <LogoSvg width="122" height="55" />

      <div className="flex items-center">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`p-5 ${
              pathname === link.path
                ? "bg-primary text-white font-bold"
                : "text-gray600 font-medium"
            }`}
          >
            {t(link.name)}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span
          className="text-gray600 font-medium cursor-pointer"
          onClick={changeLanguage}
        >
          {t("language")}
        </span>

        <span className="cursor-pointer" onClick={handleLogOut}>
          <LogOutSvg />
        </span>
      </div>
    </div>
  );
};

export default Header;
