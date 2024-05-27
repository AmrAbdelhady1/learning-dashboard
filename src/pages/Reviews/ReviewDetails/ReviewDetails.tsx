import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useReviewDetails } from "./ReviewDetails.hooks";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";

const ArticleDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useReviewDetails(params.id!);

  return (
    <DetailsPageContainer link="/reviews" title="Review Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Review Title")}: </span>
          {t("locale") === "ar" ? data?.titleArabic : data?.title}
        </p>
        <p>
          <span className="text-primary">{t("Client Name")}: </span>
          {t("locale") === "ar" ? data?.reviwerNameArabic : data?.reviwerName}
        </p>
        <p>
          <span className="text-primary">{t("Client Job")}: </span>
          {t("locale") === "ar" ? data?.jobArabic : data?.job}
        </p>
        <p>
          <span className="text-primary">{t("Description")}: </span>
          {t("locale") === "ar" ? data?.descriptionArabic : data?.description}
        </p>
      </div>
    </DetailsPageContainer>
  );
};

export default ArticleDetails;
