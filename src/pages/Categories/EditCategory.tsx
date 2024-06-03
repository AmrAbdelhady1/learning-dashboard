import React from "react";
import AddForm from "../../components/AddForm/AddForm";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../axios/axiosClient";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  categoryData: any;
  onClose: () => void;
}

const EditCategory = ({ categoryData, onClose }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: categoryData?.categoryName,
      categoryNameArabic: categoryData?.categoryNameArabic,
    },
  });

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
        },
        `Category/${categoryData?.id}`,
        "PUT"
      );

      if (res?.data) {
        navigate(`/category-details/${res?.data?.id}`);
        dispatch(addSnackbar({ message: res?.message }));
      } else {
        dispatch(
          addSnackbar({
            message: res?.errorMessage,
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
            title: t("Please Wait..."),
            desc: t("Please Wait..."),
          },
          show: false,
        })
      );
    }
  };

  return (
    <AddForm title="Category">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="categoryName"
            label="Category Name"
            register={register}
            placeholder="Enter your category name"
          />
          {errors.categoryName && (
            <ErrorMessage message="Category Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="categoryNameArabic"
            label="Category Name Arabic"
            register={register}
            placeholder="Enter your category name arabic"
          />
          {errors.categoryNameArabic && (
            <ErrorMessage message="Category Name Arabic is required" />
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t col-span-2">
          <div onClick={onClose} className="btn-secondary">
            {t("Cancel")}
          </div>
          <button type="submit" className="btn-primary">
            {t("Save")}
          </button>
        </div>
      </form>
    </AddForm>
  );
};

export default EditCategory;
