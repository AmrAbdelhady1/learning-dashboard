import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";
import { useSubServiceDetails } from "./SubServicesDetails.hooks";

const SubServiceDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useSubServiceDetails(params.id!);

  return (
    <DetailsPageContainer link="/services?tab=services" title="Service Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Service Name")}: </span>
          {t("locale") === "ar" ? data?.subServiceNameArabic : data?.subServiceName}
        </p>

        <p>
          <span className="text-primary">{t("Service Description")}: </span>
          {t("locale") === "ar" ? data?.descriptionArabic : data?.description}
        </p>
      </div>
    </DetailsPageContainer>
  );
};

export default SubServiceDetails;
