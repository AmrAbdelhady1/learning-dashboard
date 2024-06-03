import React, { ChangeEvent, useState } from "react";
import AddForm from "../../components/AddForm/AddForm";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../axios/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/svg/header-svg";
import CategoryDropDown from "../../components/InputField/CategoryDropDown";
import ServiceDropDown from "../../components/InputField/ServiceDropDown";
import SubServiceDropDown from "../../components/InputField/SubServiceDropDown";
import { useAddCourses } from "./Courses.hooks";
import { MAIN_URL } from "../../../env";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

interface Props {
  courseData: any;
  onClose: () => void;
}

const EditCourse = ({ courseData, onClose }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseName: courseData?.courseName,
      courseNameArabic: courseData?.courseNameArabic,
      description: courseData?.description,
      descriptionArabic: courseData?.descriptionArabic,
      minAge: courseData?.minAge,
      maxAge: courseData?.maxAge,
      price: courseData?.price,
      discount: courseData?.discount,
    },
  });
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | any>(
    courseData?.imageUrl
  );
  const [selectedCategory, setSelectedCategory] = useState<any>(
    courseData?.category
  );
  const [selectedService, setSelectedService] = useState<any>(
    courseData?.service
  );
  const [selectedSubService, setSelectedSubService] = useState<any>(
    courseData?.subService
  );
  const { categoryData, serviceData, subServiceData } = useAddCourses();

  const onSubmit = async (data: any) => {
    try {
      dispatch(
        updateLoader({
          details: {
            title: t("Please Wait..."),
            desc: t("Please Wait..."),
          },
          show: true,
        })
      );

      const res = await fetchData(
        {
          ...data,
          categoryId: selectedCategory?.id,
          serviceId: selectedService?.id,
          subServiceId: selectedSubService?.id,
          imageFile: uploadedFile,
        },
        `Course/${courseData?.id}`,
        "PUT",
        true
      );

      if (res?.data) {
        dispatch(addSnackbar({ message: res?.message }));
        navigate(`/course-details/${res?.data?.id}`);
      } else {
        dispatch(
          addSnackbar({
            message: res?.errorMessage,
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(addSnackbar({ message: t("network error"), type: "error" }));
    } finally {
      dispatch(
        updateLoader({
          details: {
            title: t("Please Wait..."),
            desc: t("Please Wait..."),
          },
          show: false,
        })
      );
    }
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (allowedTypes.includes(files[0].type)) {
      setUploadedFile(files[0]);
    } else {
      dispatch(
        addSnackbar({
          message: t("Please upload only Image"),
          type: "error",
        })
      );
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);
  };

  return (
    <AddForm title="Course">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="courseName"
            label="Course Name"
            register={register}
            placeholder="Enter the course name"
          />
          {errors.courseName && (
            <ErrorMessage message="Course Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="courseNameArabic"
            label="Course Name Arabic"
            register={register}
            placeholder="Enter the course name arabic"
          />
          {errors.courseNameArabic && (
            <ErrorMessage message="Course Name Arabic is required" />
          )}
        </div>

        <CategoryDropDown
          data={categoryData}
          selectedItem={selectedCategory}
          setSelectedItem={setSelectedCategory}
        />

        <ServiceDropDown
          data={serviceData}
          selectedItem={selectedService}
          setSelectedItem={setSelectedService}
        />

        <SubServiceDropDown
          data={subServiceData}
          selectedItem={selectedSubService}
          setSelectedItem={setSelectedSubService}
        />

        <div className="flex flex-col">
          <InputField
            type="text"
            name="description"
            label="Description"
            register={register}
            placeholder="Enter the description"
          />
          {errors.description && (
            <ErrorMessage message="Description Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="descriptionArabic"
            label="Description Arabic"
            register={register}
            placeholder="Enter the description arabic"
          />
          {errors.descriptionArabic && (
            <ErrorMessage message="Description Arabic Arabic is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="minAge"
            label="Minimum Age"
            register={register}
            placeholder="Enter the minimum age"
          />
          {errors.minAge && <ErrorMessage message="Minimum Age is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="maxAge"
            label="Maximum Age"
            register={register}
            placeholder="Enter the maximum age"
          />
          {errors.maxAge && <ErrorMessage message="Maximum Age is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="price"
            label="Price"
            register={register}
            placeholder="Enter the price"
          />
          {errors.price && <ErrorMessage message="Price is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="discount"
            label="Discount"
            register={register}
            placeholder="Enter the discount"
          />
          {errors.discount && (
            <ErrorMessage message="Discount Arabic is required" />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-sm capitalize text-gray600">{t("Upload Image")}</p>

          <div className="w-full px-3.5 py-2 min-h-[46px] flex items-center justify-between border border-secondary rounded-lg">
            <div className="flex items-center gap-1 flex-wrap">
              {uploadedFile ? (
                <div className="flex items-center gap-2 py-1 px-2 rounded-full bg-gray-500 text-white">
                  {uploadedFile.name}
                  <span className="cursor-pointer" onClick={handleDelete}>
                    <CloseIcon />
                  </span>
                </div>
              ) : (
                <p className="text-gray-400">
                  {t("Please upload the image...")}
                </p>
              )}
            </div>

            <label
              htmlFor="uploader"
              className="bg-gray-500 py-1 px-3 rounded-full hover:bg-primary duration-500 text-white text-sm cursor-pointer"
            >
              {t("upload")}
              <input
                type="file"
                id="uploader"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,image/*"
                className="w-full h-full hidden"
                onChange={handleUploadImage}
              />
            </label>
          </div>

          {uploadedFile && (
            <img
              src={
                typeof uploadedFile === "string"
                  ? MAIN_URL + uploadedFile
                  : URL.createObjectURL(uploadedFile)
              }
              alt="course-image"
              className="w-[250px] h-[250px] rounded-md object-cover"
            />
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t col-span-2">
          <button onClick={onClose} className="btn-secondary">
            {t("Cancel")}
          </button>
          <button type="submit" className="btn-primary">
            {t("Save")}
          </button>
        </div>
      </form>
    </AddForm>
  );
};

export default EditCourse;
