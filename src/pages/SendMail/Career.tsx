import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../axios/axiosClient";

const Career = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      dispatch(
        updateLoader({
          details: {
            title: "Please Wait...",
            desc: "Please Wait...",
          },
          show: true,
        })
      );

      const res = await fetchData(
        data,
        "SendEmail/sendCareer",
        "POST"
      );

      if (res) {
        dispatch(addSnackbar({ message: "Email sent Successfully" }));
      } else {
        dispatch(
          addSnackbar({
            message: "Something went wrong",
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(addSnackbar({ message: "network error", type: "error" }));
    } finally {
      dispatch(
        updateLoader({
          details: {
            title: "Please Wait...",
            desc: "Please Wait...",
          },
          show: false,
        })
      );
    }
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
          {errors.YearsOfExperience && <ErrorMessage message="Years Of Experience is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="message"
            label="Message"
            register={register}
            placeholder="Enter your message"
          />
          {errors.message && <ErrorMessage message="Message is required" />}
        </div>

        <button type="submit" className="btn-primary col-span-2 mt-2">
          {t("Send Mail")}
        </button>
      </form>
    </div>
  );
};

export default Career;
