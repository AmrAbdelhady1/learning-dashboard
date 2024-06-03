import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useArticleDetails } from "./ArticleDetails.hooks";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";
import { MAIN_URL } from "../../../../env";
import moment from "moment";

const ArticleDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useArticleDetails(params.id!);

  return (
    <DetailsPageContainer link="/news" title="Article Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Article Title")}: </span>
          {t("locale") === "ar" ? data?.titleArabic : data?.title}
        </p>
        <p>
          <span className="text-primary">{t("Article Author")}: </span>
          {t("locale") === "ar" ? data?.authorArabic : data?.author}
        </p>
        <p>
          <span className="text-primary">{t("Content")}: </span>
          {t("locale") === "ar" ? data?.contentArabic : data?.content}
        </p>
        <p>
          <span className="text-primary">{t("Published At")}: </span>
          {moment(data?.publishedDate).format("MMM D, YYYY")}
        </p>

        {data?.imageUrl && (
          <div className="flex items-center gap-4">
            <span className="text-primary">{t("Article Image")}: </span>
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
