import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useCategoryDetails } from "./CategoryDetails.hooks";

import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";

const CategoryDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useCategoryDetails(params.id!);

  return (
    <DetailsPageContainer link="/categories" title="Category Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Category Title")}: </span>
          {t("locale") === "ar" ? data?.categoryNameArabic : data?.categoryName}
        </p>
      </div>
    </DetailsPageContainer>
  );
};

export default CategoryDetails;
