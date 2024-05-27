import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useNotifier from "../Notifier";

const LayoutWrapper: any = (ChildComponent: any) => {
  return (props: any) => {
    const preference = useSelector(
      (state: RootState) => state.PreferenceReducer
    );

    useNotifier();

    return (
      <React.Fragment>
        {preference.showLoading && (
          <Dialog open={preference.showLoading}>
            <DialogTitle>{preference.loadingDetails?.title}</DialogTitle>
            <DialogContent>
              <Stack justifyContent={"center"} alignItems="center">
                <CircularProgress />
              </Stack>
            </DialogContent>
          </Dialog>
        )}
        <ChildComponent {...props} />
      </React.Fragment>
    );
  };
};

export default LayoutWrapper;
