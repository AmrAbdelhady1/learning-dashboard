import { useTranslation } from "react-i18next";
import React, { ReactNode, useState } from "react";

import { Link } from "react-router-dom";

import { SearchIcon } from "../../assets/svg/header-svg";

interface Props {
  title: string;
  search: string;
  btnName: string;
  btnLink: string;
  children: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainPageContainer = ({
  title,
  children,
  search,
  onChange,
  btnName,
  btnLink,
}: Props) => {
  const { t } = useTranslation();
  const [touched, setTouched] = useState<boolean>(false);

  const handleTouched = () => {
    setTouched(!touched);
  };

  return (
    <div className="main-container">
      <div className="p-6 flex flex-col gap-4">
        <p className="text-xl font-bold">{t(title)}</p>

        <div className="flex items-center gap-4">
          <div
            className={`w-full flex items-center justify-between gap-4 py-2.5 px-3.5 border border-secondary rounded-lg ${
              touched && "ring-2 ring-primary border-transparent"
            }`}
          >
            <input
              type="text"
              value={search}
              placeholder={t("Search...")}
              onChange={onChange}
              onBlur={handleTouched}
              onFocus={handleTouched}
              className="w-full bg-transparent focus:outline-none"
            />
            <SearchIcon />
          </div>

          {btnName && (
            <Link to={btnLink} className="btn-primary !w-fit">
              {t("Add")} {t(btnName)}
            </Link>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default MainPageContainer;
