import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  children: ReactNode;
}

const AddForm = ({ title, children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="main-container p-8 !gap-8 !overflow-visible">
      <p className="text-xl font-bold border-b pb-2">
        {t("Add")} {t(title)}
      </p>

      {children}
    </div>
  );
};

export default AddForm;
