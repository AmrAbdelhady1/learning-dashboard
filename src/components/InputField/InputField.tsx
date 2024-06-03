import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister } from "react-hook-form";

import { MerchantEye, PasswordEye } from "../../assets/svg/login-svg";

interface Props {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
}

const InputField = ({ label, name, type, placeholder, register }: Props) => {
  const { t } = useTranslation();
  const [touched, setTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return type === "password" ? (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm capitalize text-gray600">{label}</p>

      <div
        className={`w-full flex items-center justify-between gap-2 py-2.5 px-3.5 border border-secondary rounded-lg ${
          touched && "ring-2 ring-primary border-transparent"
        }`}
      >
        <input
          type={showPassword ? "text" : "password"}
          className="w-full bg-transparent focus:outline-none"
          placeholder={t(placeholder)}
          onFocus={() => setTouched(true)}
          {...register(name, {
            required: true,
            onBlur: () => setTouched(false),
          })}
        />

        <span className="cursor-pointer" onClick={handleShowPassword}>
          {showPassword ? <MerchantEye /> : <PasswordEye />}
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm capitalize text-gray600">{t(label)}</p>

      <input
        type="text"
        className="w-full bg-transparent py-2.5 px-3.5 border border-secondary rounded-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
        placeholder={t(placeholder)}
        {...register(name, { required: true })}
      />
    </div>
  );
};

export default InputField;
