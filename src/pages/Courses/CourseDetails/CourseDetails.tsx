import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useCourseDetails } from "./CourseDetails.hooks";

import moment from "moment";
import DetailsPageContainer from "../../../containers/DetailsPageContainer/DetailsPageContainer";
import { MAIN_URL } from "../../../../env";

const CourseDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { data }: any = useCourseDetails(params.id!);

  return (
    <DetailsPageContainer link="/courses" title="Course Details">
      <div className="flex flex-col gap-4 px-8 text-lg text-gray500 font-medium">
        <p>
          <span className="text-primary">{t("Course Title")}: </span>
          {t("locale") === "ar" ? data?.courseNameArabic : data?.courseName}
        </p>

        <p>
          <span className="text-primary">{t("Description")}: </span>
          {t("locale") === "ar" ? data?.descriptionArabic : data?.description}
        </p>

        <p>
          <span className="text-primary">{t("Category")}: </span>
          {t("locale") === "ar"
            ? data?.category?.categoryNameArabic
            : data?.category?.categoryName}
        </p>

        <p>
          <span className="text-primary">{t("Service")}: </span>
          {t("locale") === "ar"
            ? data?.service?.serviceNameArabic
            : data?.service?.serviceName}
        </p>

        <p>
          <span className="text-primary">{t("Sub Service")}: </span>
          {t("locale") === "ar"
            ? data?.subService?.subServiceNameArabic
            : data?.subService?.subServiceName}
        </p>

        <p>
          <span className="text-primary">{t("Minimum Age")}: </span>
          {data?.minAge}
        </p>

        <p>
          <span className="text-primary">{t("Maximum Age")}: </span>
          {data?.maxAge}
        </p>

        <p>
          <span className="text-primary">{t("Price")}: </span>
          {data?.price}
        </p>

        <p>
          <span className="text-primary">{t("Discount")}: </span>
          {data?.discount}
        </p>

        <p>
          <span className="text-primary">{t("Uploaded At")}: </span>
          {moment(data?.uploadedAt).format("MMM D, YYYY")}
        </p>

        {data?.imageUrl && (
          <div className="flex items-center gap-4">
            <span className="text-primary">{t("Course Image")}: </span>
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

export default CourseDetails;
