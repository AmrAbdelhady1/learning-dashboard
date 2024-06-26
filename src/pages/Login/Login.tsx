import React from "react";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import LayoutWrapper from "../../containers/LayoutWrapper";
import { LogoSvg } from "../../assets/svg/login-svg";
import InputField from "../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchData } from "../../axios/axiosClient";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
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

      const res = await fetchData(data, "Authenticate/login", "POST");

      if (res?.token) {
        dispatch(addSnackbar({ message: "Logged In Successfully" }));
        navigate("/");
        localStorage.setItem("access_token", res?.token);
      } else {
        dispatch(
          addSnackbar({
            message: "User name or Password is wrong",
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
    <div className="px-4 min-h-screen flex items-center justify-center flex-col gap-8">
      <LogoSvg width="214" height="85" />

      <div className="flex flex-col gap-2 text-center">
        <p className="text-primary text-3xl">Welcome Back</p>
        <p className="text-gray500">Welcome back! Please enter your details.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[360px] flex flex-col gap-5"
      >
        <div className="flex flex-col">
          <InputField
            type="text"
            name="username"
            label="User Name"
            register={register}
            placeholder="Enter your username"
            required
          />
          {errors.username && <ErrorMessage message="User Name is required" />}
        </div>

        <div className="flex flex-col">
          <InputField
            type="password"
            name="password"
            label="Password"
            register={register}
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <ErrorMessage
              message={
                errors.password.message
                  ? "Minimum length is 6 characters"
                  : "Password is required"
              }
            />
          )}
        </div>

        <div className="flex flex-col gap-1 w-full items-end">
          <button type="submit" className="btn-primary mt-1">
            Sign in
          </button>

          <p className="text-sm text-gray500 hover:underline font-medium">
            <Link to="/register">Create New Account?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LayoutWrapper(Login);
