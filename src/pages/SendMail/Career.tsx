import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../axios/axiosClient";
import { CloseIcon } from "../../assets/svg/header-svg";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

const Career = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

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
        { ...data, Attachments: uploadedFiles },
        "SendEmail/sendCareer",
        "POST",
        true
      );

      if (res) {
        reset();
        setUploadedFiles([]);
        dispatch(addSnackbar({ message: t("Email sent Successfully") }));
      } else {
        dispatch(
          addSnackbar({
            message: t("Something went wrong"),
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

  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (allowedTypes.includes(files[0].type)) {
      const updatedData = [...uploadedFiles];
      updatedData.push(files[0]);
      setUploadedFiles(updatedData);
    } else {
      dispatch(
        addSnackbar({
          message:
            t("Please upload only PDF, DOC, DOCX, TXT, PPT, or PPTX files."),
          type: "error",
        })
      );
    }
  };

  const handleDelete = (selectedIndex: number) => {
    const updatedData = uploadedFiles.filter(
      (item, index) => index !== selectedIndex
    );
    setUploadedFiles(updatedData);
  };

  return (
    <div className="main-container p-6 flex flex-col gap-8">
      <p className="font-bold text-2xl">{t("Career")}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="FirstName"
            label="First Name"
            register={register}
            placeholder="Enter your first name"
          />
          {errors.FirstName && (
            <ErrorMessage message="First Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="LastName"
            label="Last Name"
            register={register}
            placeholder="Enter your last name"
          />
          {errors.LastName && <ErrorMessage message="Last Name is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="Email"
            label="Email"
            register={register}
            placeholder="Enter your email"
          />
          {errors.Email && <ErrorMessage message="Email is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="Mobile"
            label="Mobile"
            register={register}
            placeholder="Enter your mobile"
          />
          {errors.Mobile && <ErrorMessage message="Mobile is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="Postion"
            label="Postion"
            register={register}
            placeholder="Enter the Postion"
          />
          {errors.Postion && <ErrorMessage message="Postion is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="YearsOfExperience"
            label="Years Of Experience"
            register={register}
            placeholder="Enter the years of experience"
          />
          {errors.YearsOfExperience && (
            <ErrorMessage message="Years Of Experience is required" />
          )}
        </div>

        <div className="flex flex-col gap-1.5 col-span-2">
          <p className="text-sm capitalize text-gray600">{t("Attachments")}</p>

          <div className="w-full px-3.5 py-2 min-h-[46px] flex items-center justify-between border border-secondary rounded-lg">
            <div className="flex items-center gap-1 flex-wrap">
              {uploadedFiles.length > 0 ? (
                uploadedFiles.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 py-1 px-2 rounded-full bg-gray-500 text-white"
                  >
                    {item.name}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDelete(index)}
                    >
                      <CloseIcon />
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  {t("Please upload the attachments...")}
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
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                className="w-full h-full hidden"
                onChange={handleUploadFiles}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary col-span-2 mt-2">
          {t("Send Mail")}
        </button>
      </form>
    </div>
  );
};

export default Career;
