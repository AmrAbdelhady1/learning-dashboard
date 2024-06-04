import React, { ChangeEvent, useEffect, useState } from "react";
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
import { useAddSubService } from "../SubServices/SubServices.hooks";
import ServiceDropDown from "../../../components/InputField/ServiceDropDown";
import { MAIN_URL } from "../../../../env";

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
  subServiceData: any;
  onClose: () => void;
}

const EditSubService = ({ subServiceData, onClose }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      SubServiceName: subServiceData?.subServiceName,
      SubServiceNameArabic: subServiceData?.subServiceNameArabic,
      Description: subServiceData?.description,
      DescriptionArabic: subServiceData?.descriptionArabic,
    },
  });
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | any>(
    subServiceData?.imageUrl
  );
  const { serviceData } = useAddSubService();
  const selected = serviceData.find(
    (item) => item?.id === subServiceData?.serviceId
  );
  const [selectedService, setSelectedService] = useState<any>(selected);
  const [serviceError, setServiceError] = useState<boolean>(false);

  useEffect(() => {
    setSelectedService(selected);
  }, [selected]);

  const onSubmit = async (data: any) => {
    const valid = handleValidation();
    if (valid) {
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
            ImageFile: uploadedFile,
            ServiceId: selectedService?.id,
          },
          `SubServices/${subServiceData?.id}`,
          "PUT",
          true
        );

        if (res?.data) {
          dispatch(addSnackbar({ message: res?.message }));
          navigate(`/sub-service-details/${res?.data?.id}`);
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
    }
  };

  const handleValidation = () => {
    if (selectedService !== null) {
      setServiceError(false);
      return true;
    } else {
      setServiceError(true);
      return false;
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
    <AddForm title="Sub Service">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="SubServiceName"
            label="Sub Service Name"
            register={register}
            placeholder="Enter the sub service name"
            required
          />
          {errors.SubServiceName && (
            <ErrorMessage message="Sub Service Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="SubServiceNameArabic"
            label="Sub Service Name Arabic"
            register={register}
            placeholder="Enter the Sub Service Name Arabic"
            required
          />
          {errors.SubServiceNameArabic && (
            <ErrorMessage message="Sub Service Name Arabic is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="Description"
            label="Description"
            register={register}
            placeholder="Enter the description"
            required={false}
          />
          {errors.Description && (
            <ErrorMessage message="Description is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="DescriptionArabic"
            label="Description Arabic"
            register={register}
            placeholder="Enter the description arabic"
            required={false}
          />
          {errors.DescriptionArabic && (
            <ErrorMessage message="Description Arabic is required" />
          )}
        </div>

        <div className="flex flex-col">
          <ServiceDropDown
            data={serviceData}
            selectedItem={selectedService}
            setSelectedItem={setSelectedService}
          />
          {serviceError && <ErrorMessage message="Service is required" />}
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

export default EditSubService;
