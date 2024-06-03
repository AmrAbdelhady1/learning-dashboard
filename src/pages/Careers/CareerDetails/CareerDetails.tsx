import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useCareerDetails } from "./CareerDetails.hooks";

import moment from "moment";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";

const CareerDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useCareerDetails(params.id!);

  return (
    <DetailsPageContainer link="/careers" title="Career Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Career Title")}: </span>
          {t("locale") === "ar" ? data?.jobArabic : data?.job}
        </p>

        <p>
          <span className="text-primary">{t("Career Location")}: </span>
          {t("locale") === "ar" ? data?.locationArabic : data?.location}
        </p>

        <p>
          <span className="text-primary">{t("Career Type")}: </span>
          {data?.type}
        </p>

        <p>
          <span className="text-primary">{t("Career Description")}: </span>
          {t("locale") === "ar" ? data?.descriptionArabic : data?.description}
        </p>

        <p>
          <span className="text-primary">{t("Career City")}: </span>
          {t("locale") === "ar" ? data?.city?.nameArabic : data?.city?.name}
        </p>

        <p>
          <span className="text-primary">{t("Career Site")}: </span>
          {data?.onsite}
        </p>

        <p>
          <span className="text-primary">{t("Created At")}: </span>
          {moment(data?.createdAt).format("MMM D, YYYY")}
        </p>
      </div>
    </DetailsPageContainer>
  );
};

export default CareerDetails;
