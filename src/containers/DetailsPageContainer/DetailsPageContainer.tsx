import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import { GoBackArrow } from "../../assets/svg/header-svg";

interface Props {
  link: string;
  title: string;
  children: ReactNode;
}

const DetailsPageContainer = ({ link, title, children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="main-container p-5">
      <Link to={link} className="flex items-center gap-2 w-fit">
        <GoBackArrow />
        <p className="font-bold text-2xl">{t(title)}</p>
      </Link>

      {children}
    </div>
  );
};

export default DetailsPageContainer;
