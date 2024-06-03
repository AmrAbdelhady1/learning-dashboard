import React, { ChangeEvent, useState } from "react";
import AddForm from "../../../components/AddForm/AddForm";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../redux/store";
import { updateLoader, addSnackbar } from "../../../redux/reducers";
import InputField from "../../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../../axios/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { CloseIcon } from "../../../assets/svg/header-svg";
import CategoryDropDown from "../../../components/InputField/CategoryDropDown";
import ServiceDropDown from "../../../components/InputField/ServiceDropDown";
import SubServiceDropDown from "../../../components/InputField/SubServiceDropDown";
import { useAddCourses } from "../Courses.hooks";

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

const AddCourse = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);
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
          CategoryId: selectedCategory?.id,
          ServiceId: selectedService?.id,
          SubServiceId: selectedSubService?.id,
          ImageFile: uploadedFile,
        },
        "Course",
        "POST",
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
            name="CourseName"
            label="Course Name"
            register={register}
            placeholder="Enter the course name"
          />
          {errors.CourseName && (
            <ErrorMessage message="Course Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="CourseNameArabic"
            label="Course Name Arabic"
            register={register}
            placeholder="Enter the course name arabic"
          />
          {errors.CourseNameArabic && (
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
            name="Description"
            label="Description"
            register={register}
            placeholder="Enter the description"
          />
          {errors.Description && (
            <ErrorMessage message="Description Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="DescriptionArabic"
            label="Description Arabic"
            register={register}
            placeholder="Enter the description arabic"
          />
          {errors.DescriptionArabic && (
            <ErrorMessage message="Description Arabic Arabic is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="MinAge"
            label="Minimum Age"
            register={register}
            placeholder="Enter the minimum age"
          />
          {errors.MinAge && <ErrorMessage message="Minimum Age is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="MaxAge"
            label="Maximum Age"
            register={register}
            placeholder="Enter the maximum age"
          />
          {errors.MaxAge && <ErrorMessage message="Maximum Age is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="Price"
            label="Price"
            register={register}
            placeholder="Enter the price"
          />
          {errors.Price && <ErrorMessage message="Price is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="Discount"
            label="Discount"
            register={register}
            placeholder="Enter the discount"
          />
          {errors.Discount && (
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
              src={URL.createObjectURL(uploadedFile)}
              alt="course-image"
              className="w-[250px] h-[250px] rounded-md object-cover"
            />
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t col-span-2">
          <Link to="/courses" className="btn-secondary">
            {t("Cancel")}
          </Link>
          <button type="submit" className="btn-primary">
            {t("Save")}
          </button>
        </div>
      </form>
    </AddForm>
  );
};

export default AddCourse;
