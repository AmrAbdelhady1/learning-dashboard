import { AlertProps } from "@mui/material";
import { FC } from "react";
import { StyledAlert } from "./customAlert.styled";
import React from "react";

export const CustomAlert: FC<AlertProps & { message: string }> = ({
  message,
  ...props
}) => {
  return <StyledAlert {...props}>{message}</StyledAlert>;
};
