import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";
import { useServiceDetails } from "./ServiceDetails.hooks";

const ServiceDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useServiceDetails(params.id!);

  return (
    <DetailsPageContainer link="/services" title="Service Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Service Name")}: </span>
          {t("locale") === "ar" ? data?.serviceNameArabic : data?.serviceName}
        </p>

        <p>
          <span className="text-primary">{t("Service Description")}: </span>
          {t("locale") === "ar" ? data?.descriptionArabic : data?.description}
        </p>
      </div>
    </DetailsPageContainer>
  );
};

export default ServiceDetails;
