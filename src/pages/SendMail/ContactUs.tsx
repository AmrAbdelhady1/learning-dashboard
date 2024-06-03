import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../axios/axiosClient";

const ContactUs = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        data,
        "SendEmail/SendContactToUsMail",
        "POST"
      );

      if (res) {
        reset();
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

  return (
    <div className="main-container p-6 flex flex-col gap-8">
      <p className="font-bold text-2xl">{t("Contact Us")}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="firstName"
            label="First Name"
            register={register}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <ErrorMessage message="First Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="lastName"
            label="Last Name"
            register={register}
            placeholder="Enter your last name"
          />
          {errors.lastName && <ErrorMessage message="Last Name is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="email"
            label="Email"
            register={register}
            placeholder="Enter your email"
          />
          {errors.email && <ErrorMessage message="Email is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="mobile"
            label="Mobile"
            register={register}
            placeholder="Enter your mobile"
          />
          {errors.mobile && <ErrorMessage message="Mobile is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="company"
            label="Company"
            register={register}
            placeholder="Enter the company"
          />
          {errors.company && <ErrorMessage message="Company is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="category"
            label="Category"
            register={register}
            placeholder="Enter the category"
          />
          {errors.category && <ErrorMessage message="Category is required" />}
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

export default ContactUs;
