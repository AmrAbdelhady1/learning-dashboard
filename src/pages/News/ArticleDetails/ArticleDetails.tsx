import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useArticleDetails } from "./ArticleDetails.hooks";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";

const ArticleDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useArticleDetails(params.id!);

  return (
    <DetailsPageContainer link="/news" title="Article Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Article Title")}: </span>
          {t("locale") === "ar" ? data?.categoryNameArabic : data?.categoryName}
        </p>
      </div>
    </DetailsPageContainer>
  );
};

export default ArticleDetails;
