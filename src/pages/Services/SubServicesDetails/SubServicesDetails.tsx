import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";
import { useSubServiceDetails } from "./SubServicesDetails.hooks";
import { MAIN_URL } from "../../../../env";

const SubServiceDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useSubServiceDetails(params.id!);

  return (
    <DetailsPageContainer link="/services?tab=sub_services" title="Sub Service Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Sub Service Name")}: </span>
          {t("locale") === "ar" ? data?.subServiceNameArabic : data?.subServiceName}
        </p>

        <p>
          <span className="text-primary">{t("Description")}: </span>
          {t("locale") === "ar" ? data?.descriptionArabic : data?.description}
        </p>

        <p>
          <span className="text-primary">{t("Service Name")}: </span>
          {t("locale") === "ar" ? data?.service?.serviceNameArabic : data?.service?.serviceName}
        </p>

        {data?.imageUrl && (
          <div className="flex items-center gap-4">
            <span className="text-primary">{t("Sub Service Image")}: </span>
            <img
              alt="course image"
              src={`${MAIN_URL}${data?.imageUrl}`}
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </DetailsPageContainer>
  );
};

export default SubServiceDetails;
