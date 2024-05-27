import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  PreferenceState,
  SnackbarItemProps,
  SnackbarPayloadProps,
} from "../../utils/app_types";
const initialState: PreferenceState = {
  snackbars: [],
  showLoading: false,
  loadingDetails: {
    title: "",
    desc: "",
  },
  loadingList: [],
};

const preferenceReducer = createSlice({
  name: "preference",
  initialState: initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      return {
        ...state,
        showLoading: action.payload,
      };
    },
    updateLoadingDetails: (state, action) => {
      return {
        ...state,
        loadingDetails: action.payload,
      };
    },
    removeSnackbar: (state, action) => {
      return {
        ...state,
        snackbars: state.snackbars.filter(
          (snackbar: any) => snackbar.key !== action.payload
        ),
      };
    },
    addSnackbar: (state: any, action: PayloadAction<SnackbarPayloadProps>) => {
      return {
        ...state,
        snackbars: [
          ...state.snackbars,
          {
            key: nanoid(),
            type: "success",
            ...action.payload,
          } as SnackbarItemProps,
        ],
      };
    },
    closeSnackbar: (state, action) => {
      state.snackbars = state.snackbars.map((snackbar: any) => {
        if (snackbar.key === action.payload) {
          snackbar.dismissed = true;
        }
        return snackbar;
      });
    },
    updateLoader: (state, action) => {
      // Append show value to the loading list
      state.loadingList = [...state.loadingList, action.payload.show];
      state.loadingDetails = action.payload.details;
      //Show Loading If number of false valuse not equal to true values
      state.showLoading = !(
        state.loadingList.filter((bool: any) => bool).length ===
        state.loadingList.filter((bool: any) => !bool).length
      );
      //Reset loadingList when the loaders done
      if (
        state.loadingList.filter((bool: any) => bool).length ===
        state.loadingList.filter((bool: any) => !bool).length
      ) {
        state.loadingList = [];
      }
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = preferenceReducer;
// Extract and export each action creator by name
export const {
  updateLoadingState,
  updateLoadingDetails,
  updateLoader,
  removeSnackbar,
  addSnackbar,
  closeSnackbar,
} = actions;
// Export the reducer, either as a default or named export
export const PreferenceReducer = reducer;
