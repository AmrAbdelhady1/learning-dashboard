import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useReviewDetails } from "./ReviewDetails.hooks";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";
import { MAIN_URL } from "../../../../env";

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

        {data?.imageUrl && (
          <div className="flex items-center gap-4">
            <span className="text-primary">{t("Review Image")}: </span>
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

export default ArticleDetails;
