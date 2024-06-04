import React, { useState } from "react";
import AddForm from "../../../components/AddForm/AddForm";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../redux/store";
import { updateLoader, addSnackbar } from "../../../redux/reducers";
import InputField from "../../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../../axios/axiosClient";
import { useCities } from "../Careers.hooks";
import { City } from "../../../types/Types";
import DropDown from "../../../components/InputField/DropDown";
import { Link, useNavigate } from "react-router-dom";

const typeData = [
  {
    id: 1,
    name: "Full-Time",
    nameArabic: "Full-Time",
  },
  {
    id: 2,
    name: "Part-Time",
    nameArabic: "Part-Time",
  },
  {
    id: 3,
    name: "Freelance",
    nameArabic: "Freelance",
  },
];

const siteData = [
  {
    id: 1,
    name: "Onsite",
    nameArabic: "Onsite",
  },
  {
    id: 2,
    name: "Remote",
    nameArabic: "Remote",
  },
  {
    id: 3,
    name: "Hybrid",
    nameArabic: "Hybrid",
  },
];

const AddCareer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCities();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedType, setSelectedType] = useState<City | null>(null);
  const [selectedSite, setSelectedSite] = useState<City | null>(null);
  const [cityError, setCityError] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<boolean>(false);
  const [siteError, setSiteError] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const valid = handleValidation();
    if (valid) {
      try {
        dispatch(
          updateLoader({
            details: {
              title: t("Please Wait..."),
              desc: "Please Wait...",
            },
            show: true,
          })
        );

        const res = await fetchData(
          {
            ...data,
            type: selectedType?.name,
            cityId: selectedCity?.id,
            onsite: selectedSite?.name,
          },
          "Career",
          "POST"
        );

        if (res?.data) {
          dispatch(addSnackbar({ message: res?.message }));
          navigate(`/career-details/${res?.data?.id}`);
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
              desc: "Please Wait...",
            },
            show: false,
          })
        );
      }
    }
  };

  const handleValidation = () => {
    let vaild = true;
    if (!selectedCity) {
      setCityError(true);
      vaild = false;
    } else {
      setCityError(false);
    }
    if (!selectedType) {
      setTypeError(true);
      vaild = false;
    } else {
      setTypeError(false);
    }
    if (!selectedSite) {
      setSiteError(true);
      vaild = false;
    } else {
      setSiteError(false);
    }

    return vaild;
  };

  return (
    <AddForm title="Career">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="job"
            label="Career Name"
            register={register}
            placeholder="Enter the career name"
            required
          />
          {errors.job && <ErrorMessage message="Career Name is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="jobArabic"
            label="Arabic Career Name"
            register={register}
            placeholder="Enter the arabic career name"
            required
          />
          {errors.jobArabic && (
            <ErrorMessage message="Arabic Career Name is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="description"
            label="Description"
            register={register}
            placeholder="Enter the description"
            required={false}
          />
          {errors.description && (
            <ErrorMessage message="Description is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="descriptionArabic"
            label="Arabic Description"
            register={register}
            placeholder="Enter the arabic description"
            required={false}
          />
          {errors.descriptionArabic && (
            <ErrorMessage message="Arabic Description is required" />
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="location"
            label="Location"
            register={register}
            placeholder="Enter the location"
            required
          />
          {errors.location && <ErrorMessage message="Location is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="text"
            name="locationArabic"
            label="Arabic Location"
            register={register}
            placeholder="Enter the arabic location"
            required
          />
          {errors.locationArabic && (
            <ErrorMessage message="Arabic Location is required" />
          )}
        </div>

        <div className="flex flex-col">
          <DropDown
            data={data}
            label="City"
            selectedItem={selectedCity}
            setSelectedItem={(e) => {
              setSelectedCity(e);
              setCityError(false);
            }}
          />
          {cityError && <ErrorMessage message="City is required" />}
        </div>

        <div className="flex flex-col">
          <DropDown
            data={typeData}
            label="Type"
            selectedItem={selectedType}
            setSelectedItem={(e) => {
              setSelectedType(e);
              setTypeError(false);
            }}
          />
          {typeError && <ErrorMessage message="Type is required" />}
        </div>

        <div className="flex flex-col">
          <DropDown
            data={siteData}
            label="Onsite"
            selectedItem={selectedSite}
            setSelectedItem={(e) => {
              setSelectedSite(e);
              setSiteError(false);
            }}
          />
          {siteError && <ErrorMessage message="Site is required" />}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t col-span-2">
          <Link to="/careers" className="btn-secondary">
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

export default AddCareer;
