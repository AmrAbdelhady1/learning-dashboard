import { SnackbarKey } from "notistack";
import { RootState } from "../store";

export const snackbarsSelector = (state: RootState) =>
  state.PreferenceReducer.snackbars;

export const snackbarByIdSelector = (id: SnackbarKey) => (state: RootState) =>
  state.PreferenceReducer.snackbars.find((snackbar) => snackbar.key === id);
