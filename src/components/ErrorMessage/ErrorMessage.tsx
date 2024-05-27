import React from "react";
import { useTranslation } from "react-i18next";

const ErrorMessage = ({ message }: { message: string }) => {
  const { t } = useTranslation();
  return <p className="text-red-500 text-sm">{t(message)}</p>;
};

export default ErrorMessage;
