import { AlertColor, AlertProps } from "@mui/material";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

export interface SnackbarItemProps {
  key: SnackbarKey;
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed: boolean;
  alertProps?: AlertProps;
  type?: AlertColor;
}

export interface SnackbarPayloadProps extends Partial<SnackbarItemProps> {
  message: SnackbarMessage;
}

export interface PreferenceState {
  snackbars: SnackbarItemProps[];
  showLoading: boolean;
  loadingDetails: {
    title?: string;
    desc: string;
  };
  loadingList: boolean[];
}
