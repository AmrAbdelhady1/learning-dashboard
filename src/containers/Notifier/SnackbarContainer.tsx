import React from "react";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { CustomAlert } from "../../components/CustomAlert";
import { snackbarByIdSelector } from "../../redux/selectors/preferenceSelectors";
import { SnackbarItemProps } from "../../utils/app_types";

export const SnackbarContainer = forwardRef<
  HTMLDivElement,
  { id: string | number }
>(({ id }, ref) => {
  const { message, type } = useSelector(
    snackbarByIdSelector(id)
  ) as SnackbarItemProps;

  const snackBarProps = {
    message: message as string,
    severity: type,
  };

  return (
    <div ref={ref}>
      <CustomAlert {...snackBarProps} />
    </div>
  );
});
